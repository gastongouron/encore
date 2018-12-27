require 'search_object'
require 'search_object/plugin/graphql'

RootQuery = GraphQL::ObjectType.define do
  name 'RootQuery'
  description 'The query root for this schema'

  # Get all artists
  field :artists, types[Types::ArtistType] do
    resolve(->(_, _, _) {
      Artist.all
    })
  end

  field :artistsHome, types[Types::ArtistType] do
    resolve(->(_, _, _) {
      Artist.all.includes(:reviews).order('reviews.score ASC').limit(12)
    })
  end

  field :usersHome, types[Types::UserType] do
    resolve(->(_, _, _) {
      User.all.left_joins(:reviews).group(:id).order('COUNT(reviews.id) DESC').limit(12)
    })
  end


  field :posts, types[Types::PostType] do
    resolve(->(_, _, _) {
      Post.all.order('created_at DESC')
    })
  end

  field :postDetail do
    type Types::PostType
    argument :id, !types.ID
    resolve(->(_, args, _) {
      Post.find(args[:id])
    })
  end

  # get all reviews
  field :reviews, types[Types::ReviewType] do
    resolve(->(_, _, _) {
      Review.all
    })
  end

  # Get an artist by id
  field :artist do
    type Types::ArtistType
    argument :id, !types.ID
    resolve (->(_, args, _) {
      Artist.find(args[:id])
    })
  end

  field :tagged, types[Types::ArtistType] do
    argument :tag, !types.String
    resolve (->(_, args, _) {
      Artist.tagged_with(args[:tag])
    })
  end

  # get a review by id
  field :review do
    type Types::ReviewType
    argument :id, !types.ID
    resolve (->(_, args, _) {
      Review.find(args[:id])
    })
  end

  # get an user by id()
  field :user do
    type Types::UserType
    argument :id, !types.ID
    resolve (->(_, args, _) {
      User.find(args[:id])
    })
  end

  # Search fiels
  field :allArtists, function: Resolvers::ArtistsSearch
  field :allUsers, function: Resolvers::UsersSearch

end
