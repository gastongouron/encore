Types::SubscriptionType = GraphQL::ObjectType.define do
  name 'Subscription'
  # description 'A way to get fresh data.'
  # field :userWasFollowed, Types::UserType, description: "An user was followed"
  # field :userWasUnfollowed, Types::UserType, description: "An user was unfollowed"
  field :userWasChanged, Types::UserType, description: "An user has changed"
  field :reviewWasAdded, Types::ArtistType do
    resolve ->(obj, args, ctx) {
    	#todo
    }
  end
end

