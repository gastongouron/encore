require 'search_object'
require 'search_object/plugin/graphql'

class Resolvers::UsersSearch
  # include SearchObject for GraphQL
  include SearchObject.module(:graphql)

  # scope is starting point for search
  scope { User.all }

  # return type
  type !types[Types::UserType]

  # inline input type definition for the advance filter
  UserFilter = GraphQL::InputObjectType.define do
    name 'UserFilter'

    argument :OR, -> { types[UserFilter] }
    argument :first_name_contains, types.String
    argument :last_name_contains, types.String
  end

  # when "filter" is passed "apply_filter" would be called to narrow the scope
  option :filter, type: UserFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip

  # apply_filter recursively loops through "OR" branches
  def apply_filter(scope, value)
    # normalize filters from nested OR structure, to flat scope list
    branches = normalize_filters(value).reduce { |a, b| a.or(b) }
    scope.merge branches
  end

  def apply_first(scope, value)
    scope.left_joins(:reviews).group(:id).order('COUNT(reviews.id) DESC').limit(12)
  end

  def apply_skip(scope, value)
    scope.offset(value)
  end

  def normalize_filters(value, branches = [])
    scope = User.all
    scope = scope.where('lower(last_name) LIKE ?', "%#{value['last_name_contains']}%") if value['last_name_contains']
    scope = scope.where('lower(first_name) LIKE ?', "%#{value['first_name_contains']}%") if value['first_name_contains']
    branches << scope
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end