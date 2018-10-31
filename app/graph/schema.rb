Schema = GraphQL::Schema.define do
  query RootQuery
  mutation Mutations::AllMutation
  subscription(Types::SubscriptionType)
  use GraphQL::Subscriptions::ActionCableSubscriptions
end