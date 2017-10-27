Rails.application.routes.draw do

  get 'static_pages/root'

  root to: "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create]
    get 'active_question/:username', :to => 'users#active_question', :as => :activate
    resource :session, only: [:create, :destroy]
    resources :groups, only: [:create, :destroy, :index, :show]
    resources :questions, only: [:show, :create, :destroy, :update]
    resources :questions do
      patch 'activate', :to => 'questions#activate', :as => :activate
    end
    resources :answer_choices, only: [:update, :destroy, :create]
  end
end
