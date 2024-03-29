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
  field :total, !types.Float
  field :score, !types.Float
  field :generosity, !types.Float
  field :technics, !types.Float
  field :ambiant, !types.Float
  field :media, types.String
  field :created_at, !types.String
  field :updated_at, !types.String
  field :artist_profile_picture, !types.String

  field :artist, types[Types::ArtistType]
  field :user, types[Types::UserType]


end
