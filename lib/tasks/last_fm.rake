class LastFm
	def initialize(key)
		@key = key	
	end

	def query(artist_name)
		response = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{artist_name}&api_key=#{@key}&format=json")
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
	  		artist = Artist.new
	  		artist.name = a["name"] 
	  		# Get images
	  		a["image"].each do |image|
	  			ap image
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



namespace :get_data do

  desc 'Getdata from last fm'
  key = ENV['LAST_FM_KEY']
  last_fm = LastFm.new(key)
  sleeptime = 1

  task :last_fm_top_list => [ :environment ] do

  	# params for task?
  	maxpages 	= 3
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
  	# params for task?
  	# add conditions do to it on all artists that dont have yet a description
  	Artist.where(description: nil).last(3).each do |a|
  		api_response = last_fm.query(a.name)
		tags = api_response["artist"]["tags"]["tag"]
		tags.each do |tag|
  			puts 'ap tag'
  			ap tag["name"]
  			a.tag_list.add(tag["name"])
  		end	
  		summary = api_response["artist"]["bio"]["summary"]
		# remove the link
		link = summary.index(' <a')
		if link
			summary = summary.slice(0..(link-1))			
		end
  		a.description = summary
  		a.save
  		puts 'artist saved, taking a quick break'
	  	sleep(sleeptime)
  	end

  end


end


  	# now iterate on all artists and update them



  	# routine: amount of pages?

  	# get page
  	# store page attrs
  	# create artists
  	# check if next page available
  	# navigate to next page

  	# todo:
  	# query last_fm api
  	# page = 1
  	# check if page < total in attrs 
  	# increment page count by one
  	# navigate to page


  	# get each page of france top
  	# for each page, make a single query on artist
  	# for each artist found, create a new artist such as:
  	# name / description / tags / picture
