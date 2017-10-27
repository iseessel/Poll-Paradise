Rails.application.routes.draw do

  get 'static_pages/root'

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :groups, only: [:create, :destroy, :index, :show]
    resources :questions, only: [:show ,:create, :destroy, :update, :activate]
    resources :answer_choices, only: [:update, :destroy, :create]
  end
end
