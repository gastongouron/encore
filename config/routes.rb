Rails.application.routes.draw do

  devise_for :users, path: :auth

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  match :graphql, to: 'graphql#index', via: [:get, :post, :options]

  devise_scope :user do
	post '/auth/facebook/callback' => 'users/omniauth_callbacks#facebook'
  end

  # NOTE: Send all routes to the main single page. This allows the client router to handle routing. This enables pretty client side URLs instead of hash URLs.
  get '/*path' => 'home#index'
end
