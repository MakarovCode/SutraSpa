Rails.application.routes.draw do

  resources :users, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :users, only: [:update]
    end
  end

  root to: "users#index"
end
