Mutations::NewReviewMutation = GraphQL::Relay::Mutation.define do
  name 'NewReviewMutation'
  description 'Mutation for creating a new review'

  input_field :body, !types.String
  input_field :user_id, !types.ID
  input_field :artist_id, !types.ID

  return_field :review, Types::ReviewType

  resolve(->(_, input, ctx){
    # inputs = input.to_h
    body = input.to_h["body"]
    uid = input.to_h["user_id"]
    aid = input.to_h["artist_id"]

    review = Review.new(body: body, artist_id: aid, user_id: uid)
    review.save!

    { review: review }
  })

end
  