class Api::QuestionsController < ApplicationController
  before_action :ensure_logged_in

  def show
    @question = Question.find_by(id: params[:id])
    if @question
      @answer_choices = @question.answer_choices
      render "api/questions/show"
    else
      render json: ["Question not found"], status: 404
    end
  end

  # expecting { question: { group_id, body},
  # =>        answer_choices: [{},{},{}] }

  def create
    @question = Question.new(question_params)
    @question.user_id = current_user.id
    @answer_choices = []
    params[:answer_choices].values.each do |answer_choice|
      answer_choice = AnswerChoice.new(answer_choice)
      answer_choice.times_chosen = 0
      @question.answer_choices << answer_choice
      @answer_choices << answer_choice
    end

    if @question.save
     render "api/questions/show"
    else
      render json: @question.errors.full_messages
    end
  end

  def destroy
    @question = Question.find_by(id: params[:id])
    if @question
      @question.destroy!
      render json: {}
    else
      render json: ["Question does not exist"], status: 422
    end
  end

  def update
    @question = Question.find_by(id: params[:id])
    if @question && @question.update(question_params)
      @answer_choices = @question.answer_choices
      render "api/questions/show"
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  private

  def question_params
    params.require(:question).permit(:group_id, :body) #will this mess up the rest of my params?
  end

end
