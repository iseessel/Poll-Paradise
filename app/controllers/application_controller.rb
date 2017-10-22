class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :current_user, :ensure_logged_in, :logged_in?

  def login!(user)
    #NB: reset_session_token returns session token.
    session[:session_token] = user.reset_session_token
    @current_user = user
  end

  def logout!
    current_user.reset_session_token
    session[:session_token] = nil
    @current_user = nil
  end

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def ensure_logged_in
    redirect_to
  end

  def logged_in?
    !!current_user
  end

end
