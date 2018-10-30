Mutations::FollowUserMutation = GraphQL::Relay::Mutation.define do
  name 'FollowUserMutation'
  description 'Mutation for following an existing user'

  input_field :follower_id, !types.ID
  input_field :followee_id, !types.ID

  return_field :user, Types::UserType

  resolve -> (_, input, _) {
    # check if he is already following, else unfollow :)
    user = User.find(input[:follower_id])
    followee = User.find(input[:followee_id])

    unless followee.followed_by?(user)
      user.follow(followee)
    else
      user.stop_following(followee)
    end
    { user: followee }
  }
end
