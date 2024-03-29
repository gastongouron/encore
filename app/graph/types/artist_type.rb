Types::ArtistType = GraphQL::ObjectType.define do
  name 'Artist'
  description 'A single artist.'

  field :id, !types.ID
  field :name, !types.String
  field :description_en, !types.String
  field :description_fr, !types.String
  field :avatar_url, !types.String
  field :profile_picture_url, !types.String
  field :cover_url, !types.String
  field :reviews_count, !types.String

  field :tags, !types.String
  field :score, !types.Float

  field :reviews, types[Types::ReviewType]
  field :users, types[Types::UserType]

end
