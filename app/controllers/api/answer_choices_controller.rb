class Api::AnswerChoicesController < ApplicationController

  def create
    @answer_choice = AnswerChoice.new(answer_choice_params)
    @answer_choice.times_chosen = 0
    if @answer_choice.save
      render 'api/answer_choices/show'
    else
      render json: @answer_choice.errors.full_messages, status: 422
    end
  end

  def choose
    @answer_choice = AnswerChoice.find_by(id: params[:answer_choice_id])
    if @answer_choice
      @answer_choice.times_chosen += 1
      @answer_choice.save
      render 'api/answer_choices/show'
    else
      render json: ["Answer choice cannot be found"], status: 422
    end
  end


  def take_back
    @answer_choice = AnswerChoice.find_by(id: params[:answer_choice_id])
    if @answer_choice
      @answer_choice.times_chosen -= 1
      @answer_choice.save
      render 'api/answer_choices/show'
    else
      render json: ["Answer choice cannot be found"], status: 422
    end
  end

  def destroy
    @answer_choice = AnswerChoice.find_by(id: params[:id])
    if @answer_choice
      @answer_choice.destroy!
      render json: {}
    else
      render json: ["Answer choice does not exist."], status: 404
    end
  end

  private

  def answer_choice_params
    params.require(:answer_choice).permit(:body, :question_id)
  end

end
