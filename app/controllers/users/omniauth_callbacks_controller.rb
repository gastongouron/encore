# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  def facebook
      puts 'in callback controller -> facebook'

      # @user = User.from_omniauth(request.env['omniauth.env']) <------- should be
      # so just bullshit, auth should be coming from request.env["omniauth.auth"] not params
      # everything happening in user.rb is a lie
      @user = User.from_omniauth(params["accessToken"])

      if @user.persisted?
        puts 'user persisted'
        sign_in_and_redirect @user, event: :authentication #this will throw if @user is not activated
        response.set_header('Authorization', params["accessToken"]["signedRequest"]) #<------ not the good token anyway :'(
        render json: @user, status: :ok # <--------- An other lie obviously
      else
        # ...it failed anyway 
        # session["devise.facebook_data"] = request.env["omniauth.auth"]
        # redirect_to new_user_registration_url
      end
    end

  # More info at:
  # https://github.com/plataformatec/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end
end
