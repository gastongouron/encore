# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    token = params["accessToken"]
    @user = User.from_omniauth(token)
    if @user.persisted?
      # sign_in(@user)
      # warden.authenticate!
      t = Warden::JWTAuth::UserEncoder.new.call(@user, 'user', nil)
      response.set_header('Authorization', "Bearer #{t}") 
      render json: @user, status: :ok
      
      # set_flash_message!(:notice, :signed_in)
    else
      # ...it failed anyway 
      set_flash_message!(:notice, "failed")
      # render json: , status: 302
    end
  end

end
