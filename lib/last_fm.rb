class LastFm
	def initialize(key)
		@key = key	
		@root_url = "http://ws.audioscrobbler.com/2.0/?method="
	end

	def query(artist_name, lang='eng')
		response = HTTParty.get("#{@root_url}artist.getinfo&artist=#{artist_name}&lang=#{lang}&utocorrect=1&api_key=#{@key}&format=json")
		format_json(response)
	end

	def correction(artist_name)
		response = HTTParty.get("#{@root_url}artist.getcorrection&artist=#{artist_name}&api_key=#{@key}&format=json")
		format_json(response)
	end

	def country(country='france', limit=10, page=1)
		response = HTTParty.get("#{@root_url}geo.gettopartists&country=#{country}&limit=#{limit}&page=#{page}&api_key=#{@key}&format=json")
		format_json(response)
	end

	def is_dead(musicbrainz_id)
		response = HTTParty.get("http://musicbrainz.org/ws/2/artist/#{musicbrainz_id}?inc=aliases&fmt=json", headers: {"User-Agent" => "HTTParty"})
	  	sleep(1.5)
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
			name = a["name"]
			dead = is_dead(mbid)
	  		unless Artist.find_by(name: name) || dead
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