Types::ReviewType = GraphQL::ObjectType.define do
  name 'Review'
  description 'A single review.'

  field :id, !types.ID
  field :body, !types.String
  field :user_id, !types.ID
  field :author_display_name, types.String
  field :author_profile_picture, types.String
  field :artist_id, !types.ID
  field :artist_name, !types.String
  field :score, !types.Float
  field :artist, types[Types::ArtistType]
  field :user, types[Types::UserType]

end
