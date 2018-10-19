require "administrate/base_dashboard"

class ArtistDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    reviews: Field::HasMany,
    users: Field::HasMany,
    id: Field::Number,
    name: Field::String,
    description_en: Field::Text,
    description_fr: Field::Text,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    avatar_url: Field::String,
    profile_picture_url: Field::String,
    cover_url: Field::String,
    mbid: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :reviews,
    :users,
    :id,
    :name,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :reviews,
    :users,
    :id,
    :name,
    :description_en,
    :description_fr,
    :created_at,
    :updated_at,
    :avatar_url,
    :profile_picture_url,
    :cover_url,
    :mbid,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :reviews,
    :users,
    :name,
    :description_en,
    :description_fr,
    :avatar_url,
    :profile_picture_url,
    :cover_url,
    :mbid,
  ].freeze

  # Overwrite this method to customize how artists are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(artist)
  #   "Artist ##{artist.id}"
  # end
end
