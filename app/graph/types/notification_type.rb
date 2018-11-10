Types::NotificationType = GraphQL::ObjectType.define do
  name 'Notification'
  description 'A single notification.'

  field :id, !types.ID
  field :user_id, !types.ID
  field :follower_id, types.ID
  field :artist_id, types.ID
  field :author_id, types.ID
  field :kind, !types.String
  field :read, !types.String
  field :follower_display_name, types.String
  field :artist_name, types.String
  field :author_display_name, types.String
  field :created_at, !types.String
  field :updated_at, types.String

  field :user, types[Types::UserType]

end
