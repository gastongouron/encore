require "#{Rails.root}/lib/last_fm"

namespace :get_data do

	desc 'Getdata from last fm'
	key = ENV['LAST_FM_KEY']
	last_fm = LastFm.new(key)
	sleeptime = 1

	# rake get_data:last_fm_top_list'[100, 1, 'france', 10]'
	task :last_fm_top_list, [:maxpages, :page, :country, :results_per_page] => [ :environment ] do |t, args|

	  	maxpages 		 = args[:maxpages].to_i
	  	page 			 = args[:page].to_i
	  	country 		 = args[:country]
	  	results_per_page = args[:results_per_page].to_i

	  	while page <= maxpages do
	  		puts '-------------------------'
	  		puts "Working on page: #{page} / #{maxpages}"
		  	api_response = last_fm.country(country, page, results_per_page)  		
		  	attrs 		 = last_fm.get_attr(api_response)
		  	artists 	 = last_fm.get_artists(api_response)
		  	last_fm.create_artists(artists)
		  	sleep(sleeptime)
		  	page += 1
	  	end
	end

	task :last_fm_artist_detail => [ :environment ] do
	  	Artist.where(description_en: nil).or(Artist.where(description_fr: nil)).each do |a|
	  		name = a.name.parameterize.underscore.humanize.downcase
	  		['en', 'fr'].each do |lang|
		  		api_response = last_fm.query(name, lang)
				if lang == 'en'
				  	res = api_response["artist"]["tags"]["tag"].nil? rescue true
					unless res
						last_fm.set_tags(a, api_response["artist"]["tags"]["tag"])
					end
				end	
		  		res = api_response["artist"]["bio"]["summary"].nil? rescue true
				unless res
			  		last_fm.set_summary(a, api_response["artist"]["bio"]["summary"], lang)
			  	else
			  		# fix artists without summary beeing non handled
				end

	  		end
		  	sleep(sleeptime)
	  	end
	end

	task :ensure_non_nil => [ :environment ] do

	end

end
