Mutations::ReviewMutation = GraphQL::ObjectType.define do
  name 'ReviewMutation'
  field :newReview, field: Mutations::NewReviewMutation.field
  field :deleteReview, field: Mutations::DeleteReviewMutation.field
  field :editReview, field: Mutations::EditReviewMutation.field
  field :editUser, field: Mutations::EditUserMutation.field
end
