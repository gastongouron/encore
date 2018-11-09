Mutations::ReadNotificationsMutation = GraphQL::Relay::Mutation.define do
  name 'ReadNotificationsMutation'
  description 'Mutation for reading notifications'

  input_field :user_id, !types.ID
  return_field :user, Types::UserType

  resolve(->(_, input, _){

    user = User.find(input[:user_id])

    Notification.where(user_id: input[:user_id]).where.not(read: [true, nil]).each do |notification|
      notification.read = true
      notification.save!
    end

    Schema.subscriptions.trigger("notificationsTicker", {user_id: user.id}, user )
    
    # create a new notification for each of users that follows this user such as: <user> shared experience on <artist>
    # create a new notification for each users that also experienced this artist
    # create a new notification for each users that follow this user and havent yet experienced this artist

    { user: user }

  })


end
  