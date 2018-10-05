Types::ReviewType = GraphQL::ObjectType.define do
  name 'Review'
  description 'A single review.'

  field :id, !types.ID
  field :body, !types.String
  field :user_id, !types.ID
  field :artist_id, !types.ID
  field :score, !types.String
  field :artist, types[Types::ArtistType]
  field :user, types[Types::UserType]

end
