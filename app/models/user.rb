class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable,  :trackable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
  # :rememberable,
  # :confirmable,
  has_many :reviews
  has_many :artists, through: :reviews

  def display_name
    [first_name, last_name].compact.join(' ')
  end

  def avatar
    profile_picture || 'Helloworld'
  end

  def jwt_payload
    {
      user_id: id,
      email: email,
      firstName: first_name,
      lastName: last_name,
      displayName: display_name,
      profilePicture: profile_picture
    }
  end

  def self.from_omniauth(auth)
    puts auth
    where(provider: 'facebook', uid: auth["id"]).first_or_create do |user|
      user.email = auth["email"]
      user.password = Devise.friendly_token[0,20]
      user.first_name = auth["first_name"]
      user.last_name = auth["last_name"]
      user.profile_picture = auth["picture"]["data"]["url"]
      # user.skip_confirmation!
    end
  end

end
