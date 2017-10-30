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
      patch 'group', :to => 'questions#group', :as => :group
    end
    resources :answer_choices, only: [:update, :destroy, :create] do
      patch 'choose', :to => 'answer_choices#choose', :as => :choose
      patch 'takeback', :to => 'answer_choices#take_back', :as => :take_back
    end
  end
end
