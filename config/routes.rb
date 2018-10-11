Rails.application.routes.draw do

  devise_for :users, path: :auth, controllers: {
    registrations:  'users/registrations'
  }

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  match :graphql, to: 'graphql#index', via: [:get, :post, :options]

  devise_scope :user do
  	post '/auth/facebook/callback' => 'users/omniauth_callbacks#facebook'
  end

  # to allow the client router to handle routing
  get '/*path' => 'home#index'
end
