# class HomeController < ApplicationController
class HomeController < ApplicationController
  def index
  	puts 'hits index'
    render file: 'public/index.html', layout: false
  end
end