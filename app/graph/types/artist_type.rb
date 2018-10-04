Types::ArtistType = GraphQL::ObjectType.define do
  name 'Artist'
  description 'A single artist.'

  field :id, !types.ID
  field :name, !types.String
  field :description, !types.String
  field :reviews, types[Types::ReviewType]
  field :users, types[Types::UserType]

end
