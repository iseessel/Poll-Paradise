class Api::GroupsController < ApplicationController
  before_action :ensure_logged_in

#NB: This action also returns 'ungrouped' questions.
  # .includes(:answer_choices)
  def index
    @groups = current_user.groups.includes(:questions)
    @questions = current_user.questions.includes(:answer_choices)
    render "api/groups/index"
  end

  def show
    @group = Group.find_by(id: params[:id])
    if @group
      @questions = @group.questions.includes(:answer_choices)
      @answer_choices = @questions.map { |question| question.answer_choices }
        .flatten
      render "api/groups/show"
    else
      render json: ["Group does not exist!"], status: 404
    end
  end

#expecting { group: {:title} }
  def create
    @group = Group.new(group_params)
    @group.user = current_user

    params[:question_ids].each do |question_id|
      @question = Question.find_by(id: question_id)
      @question.group_id = params[:group_id]
    end

    if @group.save
      render "api/groups/create"
    else
      render json: @group.errors.full_messages, status: 422
    end

  end

  def destroy
    @group = Group.find_by(id: params[:id])
    if @group
      @question_ids = @group.question_ids
      @answer_choice_ids = @group.answer_choice_ids
      @group.destroy!
      render json: {
        id: @group.id,
        answer_choice_ids: @answer_choice_ids,
        question_ids: @question_ids
      }
    else
      render json: ["Group Does not Exist"], status: 404
    end
  end

  private

  def group_params
    params.require(:group).permit(:title)
  end

end
