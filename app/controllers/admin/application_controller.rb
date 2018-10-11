module Admin
  class ApplicationController < Administrate::ApplicationController
    skip_before_action :verify_authenticity_token
    http_basic_authenticate_with name: "admin", password: "admin"    
  end
end
