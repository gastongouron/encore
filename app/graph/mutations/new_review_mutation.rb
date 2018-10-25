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
    # inputs = input.to_h
    # body = inputs["body"]
    # score = inputs["score"]
    # uid = inputs["user_id"]
    # aid = inputs["artist_id"]
    # review = Review.new(body: body, score: score, artist_id: aid, user_id: uid)
    puts '------------------------------'
    puts input.to_h
    puts '------------------------------'
    review = Review.create(input.to_h)
    review.save!

    { review: review }
  })

end
  