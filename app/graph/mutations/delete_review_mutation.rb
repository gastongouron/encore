Mutations::DeleteReviewMutation = GraphQL::Relay::Mutation.define do
  name 'DeleteReviewMutation'
  description 'Mutation for deleting an existing review'

  input_field :id, !types.ID

  return_type Types::ReviewType

  resolve -> (_, input, _) {
    review = Review.find(input[:id])

    artist = review.artist

    user =  review.user
    # Schema.subscriptions.trigger("userWasChanged", {user_id: user.id}, user )
    Schema.subscriptions.trigger("reviewWasAdded", {artist_id: artist.id}, artist)

    review.destroy!



  }
end
