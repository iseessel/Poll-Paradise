class Api::UserController < ApplicationController

  def create
    @user = user.new(user_params)
    if @user.save
      login!(@user)
      render :new
    else
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
