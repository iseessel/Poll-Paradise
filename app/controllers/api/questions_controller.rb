class Api::QuestionsController < ApplicationController

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
    @question.user = current_user

    @answer_choices = params[:answer_choices].map_with_index do |answer_choice, idx|
      answer_choice = AnswerChoice.new(params[:answer_choices][idx])
      answer_choice.times_chosen = 0
      if (@question.answer_choices << answer_choice)
        answer_choice
      else
        render json: answer_choice.erorrs.full_messages, status: 422
      end
    end

    if @question.save
     render json: "api/questions/show"
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
      render "api/questions/show"
    else
      render json: @question.errors.full_messages, status: 422
    end
  end

  private

  def question_params
    params.permit(:question).require(:group_id, :body) #will this mess up the rest of my params?
  end




end
