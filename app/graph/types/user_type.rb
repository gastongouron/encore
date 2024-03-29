Types::UserType = GraphQL::ObjectType.define do
  name 'User'
  description 'A single user exposed to public.'

  field :id, !types.ID
  field :first_name, !types.String
  field :last_name, !types.String
  field :email, !types.String
  field :display_name, !types.String
  field :locale, !types.String
  field :profile_picture, !types.String
  field :reviews, types[Types::ReviewType]
  field :artists, types[Types::ArtistType]
  field :followers, types[Types::UserType]
  field :following_users, types[Types::UserType]
  field :notifications, types[Types::NotificationType]

end
