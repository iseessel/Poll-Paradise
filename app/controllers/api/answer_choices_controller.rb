class Api::AnswerChoicesController < ApplicationController

  def create
    @answer_choice = AnswerChoice.new(answer_choice_params)
    if @answer_choice.save
      render 'api/answer_choices/show'
    else
      render json: @answer_choice.errors.full_messages, status: 422
    end
  end

  def update_times_chosen
    @answer_choice = AnswerChoice.find_by(id: params[:answer_choice_id])
    if @answer_choice.update_times_chosen(params[:differential].to_i)
      #Dynamically set up subscription channel and trigger pusher to
        #respond with the answer_choice_id and the times_chosen
      Subscription.new(@answer_choice).subscribe
      render json: { timesChosen: @answer_choice.times_chosen }
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
