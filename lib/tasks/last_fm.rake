class LastFm
	def initialize(key)
		@key = key	
	end

	def query(artist)
		response = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=#{artist}&api_key=#{@key}&format=json")
		format_and_print(response)
	end

	def correction(artist_name)
		response = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=artist.getcorrection&artist=#{artist_name}&api_key=#{@key}&format=json")
		format_and_print(response)
	end

	def country(country='france', limit=50, page=1)
		response = HTTParty.get("http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=#{country}&limit=#{limit}&page=#{page}&api_key=#{@key}&format=json")
		format_and_print(response)
	end

	def format_and_print(response)
		ap JSON.parse(response.to_json)
	end

end


namespace :get_data do

  desc 'Getdata from last fm'

  task :last_fm do

	key = ENV['LAST_FM_KEY']
  	last_fm = LastFm.new(key)
  	# last_fm.query('Rone')
  	# last_fm.correction('Lmoepal')
  	# last_fm.country('france', 100, 3)

  	# todo:
  	# get each page of france top
  	# for each page, make a single query on artist
  	# for each artist found, create a new artist such as:
  	# name / description / tags / picture

  end
  
end

