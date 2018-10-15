class LastFm
	def initialize(key)
		@key = key	
	end

	def query(artist_name, lang='eng')
		response = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{artist_name}&lang=#{lang}&utocorrect=1&api_key=#{@key}&format=json")
		format_json(response)
	end

	def correction(artist_name)
		response = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getcorrection&artist=#{artist_name}&api_key=#{@key}&format=json")
		format_json(response)
	end

	def country(country='france', limit=10, page=1)
		response = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=#{country}&limit=#{limit}&page=#{page}&api_key=#{@key}&format=json")
		format_json(response)
	end

	def is_dead(musicbrainz_id)
		response = HTTParty.get("http://musicbrainz.org/ws/2/artist/#{musicbrainz_id}?inc=aliases&fmt=json", headers: {"User-Agent" => "HTTParty"})
	  	sleep(1.5)
	  	ap response["life-span"]
		response["life-span"]["ended"]
	end

	def format_json(response)
		JSON.parse(response.to_json)
	end

	def get_artists(parsed_response)
		parsed_response["topartists"]["artist"]
	end

	def get_attr(parsed_response)
		parsed_response["topartists"]["@attr"]
	end

	def create_artists(artists)
	  	artists.each do |a|
			mbid = a["mbid"]
			puts mbid
			name = a["name"]
			dead = is_dead(mbid)
			puts "is #{name} a dead artist?: " + dead.to_s
	  		unless dead || Artist.find_by(name: name)
    	  		artist = Artist.new
    	  		artist.name = name
    	  		artist.mbid = mbid
    	  		a["image"].each do |image|
    				case image['size'] 
    				when 'small'
    			  		artist.avatar_url = image["#text"] 
    				when 'medium'
    			  		artist.profile_picture_url = image["#text"] 
    				when 'extralarge'
    			  		artist.cover_url = image["#text"] 
    				end
    	  		end
    	  		artist.save
			end
	  	end
	end
end



# nest both tasks in a larger, smarter one.
namespace :get_data do
	# include LastFm
	# use musicbrainz for death/alive
	desc 'Getdata from last fm'
	key = ENV['LAST_FM_KEY']
	lang = 'en'
	last_fm = LastFm.new(key)
	sleeptime = 0.4
	
	task :last_fm_top_list => [ :environment ] do

	  	# params for task?
	  	maxpages 	= 10
	  	page 		= 1
	  	country 	= 'france'
	  	results_per_page = 10

	  	while page <= maxpages do
		  	api_response = last_fm.country(country, page, results_per_page)  		
		  	attrs = last_fm.get_attr(api_response)
		  	artists = last_fm.get_artists(api_response)
		  	last_fm.create_artists(artists)
		  	puts 'taking a quick break :>'
		  	sleep(sleeptime)
		  	page += 1
	  	end
	end

	task :last_fm_artist_detail => [ :environment ] do

	  	Artist.where(description: nil).each do |a|
	  		# normalize name
	  		name = a.name.mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s
	  		api_response = last_fm.query(name, lang)
			tags = api_response["artist"]["tags"]["tag"]
			puts 'Tags:'
			tags.each do |tag|
	  			ap tag["name"]
	  			a.tag_list.add(tag["name"])
	  		end	
	  		summary = api_response["artist"]["bio"]["summary"]
	  		summary = JSON.parse(summary.to_json)
			# remove the link
			puts summary
			summary = summary.slice(0..(summary.rindex('<a href')))

			puts summary.length
			unless summary.empty? || summary.length < 3
				rindex = summary.rindex('.')
				if rindex 
					summary = summary.slice(0..(rindex))
				end
			else
				summary = "..."
			end
			ap summary
	  		a.description = summary
	  		a.save!
	  		puts "#{name} has been saved, taking a quick break..."
		  	sleep(sleeptime)
	  	end

	end

end
