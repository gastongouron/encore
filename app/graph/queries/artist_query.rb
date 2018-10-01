ArtistQuery = GraphQL::ObjectType.define do
  name 'ArtistQuery'
  description 'The query root for this schema'

  field :artists_test, types[Types::ArtistType] do
    resolve(->(_, _, _) {
      Artist.all
    })
  end

  field :artist do
    type Types::ArtistType
    argument :id, !types.ID
    resolve (->(_, args, _) {
      Artist.find(args[:id])
    })
  end

end
