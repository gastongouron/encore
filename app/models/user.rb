class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable,  :trackable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null
  # :rememberable,
  # :confirmable,
  has_many :reviews
  has_many :artists, through: :reviews
  has_many :notifications
  
  acts_as_followable
  acts_as_follower

  def display_name
    [first_name, last_name].compact.join(' ')
  end

  def unread_notifications_count
    self.notifications.where(read: false).count
  end

  def jwt_payload
    {
      user_id: id,
      email: email,
      first_name: first_name,
      last_name: last_name,
      display_name: display_name,
      profile_picture: profile_picture,
      locale: locale || I18n.locale
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

  def send_devise_notification(notification, *args)
    I18n.with_locale(self.locale) { super }
  end

end
