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

    if params[:answer_choices]
      params[:answer_choices].values.each do |answer_choice|
        answer_choice = AnswerChoice.new(answer_choice)
        answer_choice.times_chosen = 0
        @question.answer_choices << answer_choice
        @answer_choices << answer_choice
      end
    end

    if @question.save
     render "api/questions/show"
    else
      render json: @question.errors, status: 422
    end
  end

  def destroy
    @question = current_user.questions.find_by(id: params[:id])
    if @question
      @answer_choice_ids = @question.answer_choice_ids
      @group = @question.group
      @group_ids = (@group ? @group.id : nil )

      @question.destroy!
      render json: {
        group_id: @group_ids,
        id: @question.id,
        answer_choice_ids: @answer_choice_ids
      }
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

  def activate
    @question = Question.find_by(id: params[:question_id])

    if @question
      @prev_activated_question = @question.user.question_activated
      
      self.toggle_active(@prev_activated_question).save! if @prev_activated_question
      self.toggle_active(@question).save!

      render "api/questions/activate"
    else
      render json: ["Question not found"], status: 404
    end
  end

  def toggle_active(question)
    active = question.active
    question.active = (active ? false : true)
    question
  end

  private

  def question_params
    params.require(:question).permit(:group_id, :body, answer_choices_attributes: [:body] ) #will this mess up the rest of my params?
  end
  #nested_attributes will automatically create these for you!

end
