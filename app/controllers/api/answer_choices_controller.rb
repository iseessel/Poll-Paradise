class Api::AnswerChoicesController < ApplicationController

  def update
    @answer_choice = Answer.find_by(id: params[:id])
    @answer_choice.times_chosen += 1
    if @answer_choice.save
      render json: 'api/answer_choices/show'
    else
      render json: @answer_choice.errors.full_messages, status: 422
    end
  end

  def destroy
    @answer_choice = Answer.find_by(id: params[:id])
    @answer_choice.destroy!
    render json: {}
  end

end
