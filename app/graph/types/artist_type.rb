Types::ArtistType = GraphQL::ObjectType.define do
  name 'Artist'
  description 'A single artist.'

  field :id, !types.ID
  field :name, !types.String
  field :description, !types.String
end
