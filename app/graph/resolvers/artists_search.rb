require 'search_object'
require 'search_object/plugin/graphql'

class Resolvers::ArtistsSearch
  # include SearchObject for GraphQL
  include SearchObject.module(:graphql)

  # scope is starting point for search
  scope { Artist.all }

  # return type
  type !types[Types::ArtistType]

  # inline input type definition for the advance filter
  ArtistFilter = GraphQL::InputObjectType.define do
    name 'ArtistFilter'

    argument :OR, -> { types[ArtistFilter] }
    argument :description_contains, types.String
    argument :name_contains, types.String
  end

  # when "filter" is passed "apply_filter" would be called to narrow the scope
  option :filter, type: ArtistFilter, with: :apply_filter
  option :first, type: types.Int, with: :apply_first
  option :skip, type: types.Int, with: :apply_skip

  # apply_filter recursively loops through "OR" branches
  def apply_filter(scope, value)
    # normalize filters from nested OR structure, to flat scope list
    branches = normalize_filters(value).reduce { |a, b| a.or(b) }
    scope.merge branches
  end

  def apply_first(scope, value)
    scope.limit(value)
  end

  def apply_skip(scope, value)
    scope.offset(value)
  end

  def normalize_filters(value, branches = [])
    # add like SQL conditions
    # todo add genre to conditions such as RAP or ROCK
    scope = Artist.all

    # check manually is a value is a tag. 
    # puts ActsAsTaggableOn::Tag.where(name: value['name_contains'] ).exists?

    scope = scope.where('lower(description) LIKE ?', "%#{value['description_contains']}%") if value['description_contains']
    scope = scope.where('lower(name) LIKE ?', "%#{value['name_contains']}%") if value['name_contains']

    branches << scope

    # continue to normalize down
    value['OR'].reduce(branches) { |s, v| normalize_filters(v, s) } if value['OR'].present?

    branches
  end
end