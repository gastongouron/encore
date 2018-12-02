Types::PostType = GraphQL::ObjectType.define do
  name 'Post'
  description 'A single post.'

  field :id, !types.ID
  field :title, !types.String
  field :body, !types.String
  field :created_at, !types.String
  field :author, !types.String
  field :image_url, !types.String

end
