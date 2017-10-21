Rails.application.routes.draw do

  get 'static_pages/root'

  root to: "static_pages#root"

  namespace :api do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
  end

end
