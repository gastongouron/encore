class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable,
    :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

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

end
