Mutations::DeleteReviewMutation = GraphQL::Relay::Mutation.define do
  name 'DeleteReviewMutation'
  description 'Mutation for deleting an existing review'

  input_field :id, !types.ID

  # return_field :review, Types::ReviewType
  return_type Types::ReviewType

  resolve -> (_, input, _) {
    review = Review.find(input[:id])
    review.destroy!
  }
end
