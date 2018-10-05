Mutations::NewReviewMutation = GraphQL::Relay::Mutation.define do
  name 'NewReviewMutation'
  description 'Mutation for creating a new review'

  input_field :body, !types.String
  input_field :user_id, !types.ID
  input_field :artist_id, !types.ID

  return_field :review, Types::ReviewType

  resolve(->(_, input, ctx){
    inputs = input.to_h
    body = inputs["body"]
    uid = inputs["user_id"]
    aid = inputs["artist_id"]
    review = Review.new(body: body, artist_id: aid, user_id: uid)
    review.save!

    { review: review }
  })

end
  