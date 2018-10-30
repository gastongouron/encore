source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

ruby '2.4.1'

gem 'rails', '~> 5.1.0.rc1'
gem 'pg'

gem 'graphql'
gem 'graphiql-rails'
gem 'search_object', '1.2.0'
gem 'search_object_graphql', '0.1'
gem 'rails-i18n'

gem 'devise'
gem 'devise-jwt'
gem 'administrate'

# gem 'aws-sdk', '~> 3'
gem 'fog'

gem 'acts-as-taggable-on'
gem 'acts_as_follower', github: 'tcocca/acts_as_follower', branch: 'master'

gem 'httparty'
gem 'faker'

group :development, :test do
  gem 'awesome_print'
  gem 'sass-rails'
  gem 'uglifier'
  gem 'coffee-rails'
  # gem 'rack-cors'

  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'dotenv-rails'
end

group :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
end

group :development do
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'foreman', '~> 0.82.0'
end

group :production do
  gem 'puma'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
