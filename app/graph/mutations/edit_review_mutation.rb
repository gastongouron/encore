Mutations::EditReviewMutation = GraphQL::Relay::Mutation.define do
  name 'EditReviewMutation'
  description 'Mutation for editing an existing review'

  input_field :id, !types.ID
  input_field :body, !types.String
  input_field :score, !types.Float
  input_field :media, types.String

  return_field :review, Types::ReviewType

  resolve -> (_, input, _) {
    review = Review.find(input[:id])
    puts '------------------------------'
    puts input.to_h
    puts '------------------------------'
    review.update!(input.to_h)

    # unless input[:media] 
    #   a = review.media  
    #   a = nil
    #   review.save!
    # end

    puts '------------------------------'
    puts review.media

    { review: review }
  }
end
