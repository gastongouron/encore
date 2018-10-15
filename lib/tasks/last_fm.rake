# http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=af337457ddc3613785f48c7e34bc4d8c&format=json

namespace :get_data do
  desc 'Getdata from last fm'
  task :last_fm do
    puts 'Hello world'
  end
  
  # desc 'POll data from last fm in production'
  # task :live do
  #   puts 'Hello world'
  # end  
end

