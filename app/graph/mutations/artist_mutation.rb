Mutations::ArtistMutation = GraphQL::ObjectType.define do
  name 'ArtistMutation'
  field :newArtist, field: Mutations::NewArtistMutation.field
  field :editArtist, field: Mutations::EditArtistMutation.field
end
