Schema = GraphQL::Schema.define do
  query RootQuery
  mutation Mutations::AllMutation
end