Types::SubscriptionType = GraphQL::ObjectType.define do
  name 'Subscription'

  field :userWasChanged, Types::UserType do
	argument 'user_id', !types.ID
	# subscription_scope :user_id
	resolve ->(obj, args, ctx) {
		obj
    }
  end

  field :reviewWasAdded, Types::ArtistType do
	argument 'artist_id', !types.ID
	# subscription_scope :artist_id
	resolve ->(obj, args, ctx) {
		obj
    }
  end

  field :notificationsTicker, Types::UserType do
  	argument 'user_id', !types.ID
	resolve ->(obj, args, ctx) {
		obj
    }
  end

end

