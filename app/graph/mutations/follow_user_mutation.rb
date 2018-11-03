Mutations::FollowUserMutation = GraphQL::Relay::Mutation.define do
  name 'FollowUserMutation'
  description 'Mutation for following an existing user'

  input_field :follower_id, !types.ID
  input_field :followee_id, !types.ID

  return_field :user, Types::UserType

  resolve -> (_, input, _) {

    user = User.find(input[:follower_id])
    followee = User.find(input[:followee_id])

    unless followee.followed_by?(user)
      user.follow(followee)
      Schema.subscriptions.trigger("userWasChanged", {user_id: followee.id}, followee)
    else
      user.stop_following(followee)
      Schema.subscriptions.trigger("userWasChanged", {user_id: followee.id}, followee)
    end
    { user: followee }
  }
end
