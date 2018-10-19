require "#{Rails.root}/lib/last_fm"


# every day ?

namespace :get_data do
	desc 'Getdata from last fm'
	key = ENV['LAST_FM_KEY']
	lang = 'fr'
	last_fm = LastFm.new(key)
	sleeptime = 1
	
	task :last_fm_top_list => [ :environment ] do

	  	# params for task?
	  	maxpages 	= 50
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


	  	Artist.where(description_en: nil).each do |a|
	  		name = a.name.parameterize.underscore.humanize.downcase
	  		# name = a.name.mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s
	  		api_response = last_fm.query(name, 'en')

			api_response["artist"]["tags"]["tag"].each do |tag|
	  			a.tag_list.add(tag["name"])
	  		end
	  		summary = api_response["artist"]["bio"]["summary"]
	  		summary = JSON.parse(summary.to_json)
			summary = summary.slice(0..(summary.rindex('<a href')))
			unless summary.empty? || summary.length < 3
				rindex = summary.rindex('.')
				if rindex 
					summary = summary.slice(0..(rindex))
				end
			else
				summary = "Nothing yet.."
			end
	  		a.description_en = summary
	  		a.save!
	  		puts "#{name} english description has been saved, taking a quick break..."
		  	sleep(sleeptime)
	  	end

	  	Artist.where(description_fr: nil).each do |a|
	  		name = a.name.parameterize.underscore.humanize.downcase
	  		# name = a.name.mb_chars.normalize(:kd).gsub(/[^\x00-\x7F]/n,'').downcase.to_s
	  		api_response = last_fm.query(name, 'fr')

	  		summary = api_response["artist"]["bio"]["summary"]
	  		summary = JSON.parse(summary.to_json)
			summary = summary.slice(0..(summary.rindex('<a href')))
			unless summary.empty? || summary.length < 3
				rindex = summary.rindex('.')
				if rindex 
					summary = summary.slice(0..(rindex))
				end
			else
				summary = "Rien pour le moment"
			end
	  		a.description_fr = summary
	  		a.save!
	  		puts "#{name} French description has been saved, taking a quick break..."
		  	sleep(sleeptime)
	  	end

	end

end
