class Api::SessionsController < ApplicationController
  def create
    #NB: find_by_credentials checks username and password match.
    userObject = params[:user]
    @user = User.find_by_credentials(
      userObject[:email],
      userObject[:password])

    if @user
      login!(@user)
      render "api/users/show"
    else
      render json: ["That password isn't recognized, or the user couldn't be found."], status: 422
    end
  end

  def destroy
    if current_user
      logout!
      render json: {}
    else
      render json: ["Nobody is Logged In!"], status: 422
    end
  end

end
