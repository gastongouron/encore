# # http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=af337457ddc3613785f48c7e34bc4d8c&format=json

# namespace :get_data do
#   desc 'Getdata from last fm'
#   task :last_fm do
#     puts 'Hello world'
#   end
  
# end


# # Use the class methods to get down to business quickly
# key = ENV['']
# response = HTTParty.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Cher&api_key=af337457ddc3613785f48c7e34bc4d8c&format=json')

# puts response.body, response.code, response.message, response.headers.inspect

# # Or wrap things up in your own class
# class StackExchange
#   include HTTParty
#   base_uri 'api.stackexchange.com'

#   def initialize(service, page)
#     @options = { query: { site: service, page: page } }
#   end

#   def questions
#     self.class.get("/2.2/questions", @options)
#   end

#   def users
#     self.class.get("/2.2/users", @options)
#   end
# end

# stack_exchange = StackExchange.new("stackoverflow", 1)
# puts stack_exchange.questions
# puts stack_exchange.users