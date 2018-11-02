Types::SubscriptionType = GraphQL::ObjectType.define do
  name 'Subscription'
  field :userWasChanged, Types::UserType, description: "An user has changed"
  field :reviewWasAdded, Types::ArtistType do
    resolve ->(obj, args, ctx) {
    	#todo
    }
  end
end

