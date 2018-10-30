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
    # set or remove most reviewed tag
    # review.artist.most_reviewed
    review.save!
    # review.artist.check_if_most_reviewed
    { review: review }
  })

  # set or remove most reviewed tag


end
  