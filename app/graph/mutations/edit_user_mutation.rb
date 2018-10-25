Mutations::EditUserMutation = GraphQL::Relay::Mutation.define do
  name 'EditUserMutation'
  description 'Mutation for editing an existing user'

  input_field :id, !types.ID
  input_field :locale, !types.String

  return_field :user, Types::UserType

  resolve -> (_, input, _) {
    user = User.find(input[:id])
    user.update!(input.to_h)
    if input[:locale]
      I18n.locale = input[:locale]
    end
    user.save!
    { user: user }
  }
end
