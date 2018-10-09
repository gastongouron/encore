class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_many :reviews
  has_many :artists, through: :reviews

  def display_name
    [first_name, last_name].compact.join(' ')
  end

  def jwt_payload
    {
      user_id: id,
      email: email,
      firstName: first_name,
      lastName: last_name,
      displayName: display_name
    }
  end

  def self.from_omniauth(auth)
    puts auth
    where(provider: 'facebook', uid: auth["id"]).first_or_create do |user|
      user.email = auth["email"]
      user.password = Devise.friendly_token[0,20]
      user.first_name = auth["first_name"]   # assuming the user model has a name
      user.last_name = auth["last_name"]   # assuming the user model has a name
      user.profile_picture = auth["picture"]["data"]["image"] # assuming the user model has an image
      user.skip_confirmation!
      # If you are using confirmable and the provider(s) you use validate emails, 
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end


end
