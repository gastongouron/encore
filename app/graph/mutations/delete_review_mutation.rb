Mutations::DeleteReviewMutation = GraphQL::Relay::Mutation.define do
  name 'DeleteReviewMutation'
  description 'Mutation for deleting an existing review'

  input_field :id, !types.ID

  return_type Types::ReviewType

  resolve -> (_, input, _) {
    review = Review.find(input[:id])

    artist = review.artist

    user =  review.user
    Schema.subscriptions.trigger("userWasChanged", {}, user )
    Schema.subscriptions.trigger("reviewWasAdded", {}, artist)

    review.destroy!



  }
end
