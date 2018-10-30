# Mutations::FollowUserMutation = GraphQL::Relay::Mutation.define do
#   name 'FollowUserMutation'
#   description 'Mutation for following an existing user'

#   input_field :follower_id, !types.ID
#   input_field :followee_id, !types.String

#   return_field :user, Types::UserType

#   resolve -> (_, input, _) {
#     # check if we have current user here..    
#     # check if he is already following, else unfollow :)
#     user = User.find(input[:follower_id])
#     user.follow(User.find(input[:followee_id]))
#     user.update!(input.to_h)
#     user.save!
#     { user: user }
#   }
# end
