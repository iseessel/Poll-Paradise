class Api::QuestionsController < ApplicationController
  before_action :ensure_logged_in,
    only: [:show, :create, :destroy, :update, :activate]

  def show
    @question = current_user.questions.find_by(id: params[:id])
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
    debugger
    @answer_choices = []
    answer_choice_bodies = answer_choices_params


    params[:images].each_with_index do |image, idx|
      if image != "false" ||
        answer_choice_bodies[idx][:body].length != 0
        answer_choice = AnswerChoice.new()
          answer_choice_body = answer_choice_bodies[idx][:body]
        answer_choice.body = answer_choice_body unless
          answer_choice_body.length === 0
        answer_choice.times_chosen = 0
        answer_choice.image = image unless image === "false"
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
        groupId: @group_ids,
        id: @question.id,
        answerChoiceIds: @answer_choice_ids
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

#NB: Because the form data object(in js) does not accept nested attributes, we must
#    json encode the body of each param; therefore we must decode it here.

  def question_params
    question_params = JSON.parse(params.require(:question))
    ActionController::Parameters.new(question_params)
      .permit(:group_id, :body)
  end

  def answer_choices_params
    json_decryped_array = JSON.parse(params.require(:answer_choices))
    answer_choices_params = { answer_choices: json_decryped_array }
    ActionController::Parameters.new(answer_choices_params)
      .permit(answer_choices: [:body, :image])[:answer_choices]
  end

end
