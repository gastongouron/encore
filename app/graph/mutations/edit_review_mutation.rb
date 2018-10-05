Mutations::EditReviewMutation = GraphQL::Relay::Mutation.define do
  name 'EditReviewMutation'
  description 'Mutation for editing an existing review'

  input_field :id, !types.ID
  input_field :body, !types.String

  return_field :review, Types::ReviewType

  resolve -> (_, input, _) {
    review = Review.find(input[:id])
    review.update(input.to_h)
    { review: review }
  }
end
