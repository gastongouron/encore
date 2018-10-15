module Admin
  class ApplicationController < Administrate::ApplicationController
    skip_before_action :verify_authenticity_token
    http_basic_authenticate_with name: ENV['ENCORE_ADMIN_LOGIN'], password: ENV['ENCORE_ADMIN_PASSWORD']    
  end
end
