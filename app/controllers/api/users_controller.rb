class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def active_question
    @user = User.find_by(username: params[:username])
    @question = @user.question_activated

    if @question
      @answer_choices = @question.answer_choices
      render "api/questions/show"
    else
      render json: ["User has no active polls"], status: 404
    end

  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :first_name, :last_name)
  end

end
