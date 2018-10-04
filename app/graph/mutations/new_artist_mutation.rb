Mutations::NewArtistMutation = GraphQL::Relay::Mutation.define do
  name 'NewArtistMutation'
  description 'Mutation for creating a new artist'

  input_field :name, !types.String
  input_field :description, !types.String

  return_field :artist, Types::ArtistType

  resolve(->(_, input, ctx){
    inputs = input.to_h
    # if input[:rating]
    #   inputs['rating'] = input[:rating].to_f
    # end
    artist = Artist.create(inputs)
    { artist: artist }
  })

end
  