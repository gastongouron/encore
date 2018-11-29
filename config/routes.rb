Rails.application.routes.draw do

  namespace :admin do
    %i(
      artists
      reviews
      posts
    ).each do |name|
      resources name, only: %i(index show new create edit update destroy)
    end
    resources :users
    root to: "users#index"
  end

  devise_for :users, path: :auth, controllers: {
    registrations:  'users/registrations'
  }

  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  match :graphql, to: 'graphql#index', via: [:get, :post, :options]


  get '/s3/sign', to: 's3/s3#create'

  devise_scope :user do
  	post '/auth/facebook/callback' => 'users/omniauth_callbacks#facebook'
  end

  # to allow the client router to handle routing
  get '/*path' => 'home#index'

end
