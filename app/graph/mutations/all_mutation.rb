Mutations::AllMutation = GraphQL::ObjectType.define do
  name 'AllMutation'
  field :newReview, field: Mutations::NewReviewMutation.field
  field :deleteReview, field: Mutations::DeleteReviewMutation.field
  field :editReview, field: Mutations::EditReviewMutation.field
  field :editUser, field: Mutations::EditUserMutation.field
  field :followUser, field: Mutations::FollowUserMutation.field
end
