Mutations::NewReviewMutation = GraphQL::Relay::Mutation.define do
  name 'NewReviewMutation'
  description 'Mutation for creating a new review'

  input_field :body, !types.String
  input_field :score, !types.Float
  input_field :user_id, !types.ID
  input_field :artist_id, !types.ID
  input_field :media, types.String
  return_field :review, Types::ReviewType

  resolve(->(_, input, ctx){
    review = Review.create(input.to_h)
    artist = review.artist
    user =  User.find(input.to_h["user_id"])

    
    # Notification.create(
    #   kind: 'follow',
    #   user_id: followee.id,
    #   follower_display_name: user.display_name
    # )
    
    # create a new notification for each of users that follows this user such as: <user> shared experience on <artist>
    # create a new notification for each users that also experienced this artist
    # create a new notification for each users that follow this user and havent yet experienced this artist

    Schema.subscriptions.trigger("userWasChanged", {user_id: user.id}, user )
    Schema.subscriptions.trigger("reviewWasAdded", {artist_id: artist.id}, artist)

    review.save!

    { review: review }

  })


end
  