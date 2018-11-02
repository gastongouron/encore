Types::SubscriptionType = GraphQL::ObjectType.define do
  name 'Subscription'

  field :userWasChanged, Types::UserType do
    resolve ->(obj, args, ctx) {
    	obj
    }
  end

  field :reviewWasAdded, Types::ArtistType do
	# argument :id, String, required: false
    resolve ->(obj, args, ctx) {
    	puts args
    	puts '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
		puts ctx
    	puts '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
		# puts args
    	obj
    }
  end
end

