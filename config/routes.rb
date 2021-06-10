Rails.application.routes.draw do

  get 'hello_world', to: 'hello_world#index'
  resources :users, only: [:index, :show]

  namespace :api do
    namespace :v1 do
      resources :users, only: [:update] do
        member do
          post "upload_photo"
        end
      end
    end
  end

  root to: "users#index"
end
