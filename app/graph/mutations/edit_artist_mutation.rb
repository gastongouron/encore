Mutations::EditArtistMutation = GraphQL::Relay::Mutation.define do
  name 'EditArtistMutation'
  description 'Mutation for editing an existing artist'

  input_field :id, !types.ID
  input_field :name, !types.String
  input_field :description, !types.String

  return_field :artist, Types::ArtistType

  resolve -> (_, input, _) {
    artist = Artist.find(input[:id])
    artist.update(input.to_h)
    { artist: artist }
  }
end
