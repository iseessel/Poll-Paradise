class Api::GroupsController < ApplicationController
  before_action :ensure_logged_in

#NB: This action also returns 'ungrouped' questions.
  def index
    polls = UserPolls.new(current_user)
    @groups, @questions, @last_updated_id = polls.dependencies
      .values_at(:groups, :questions, :last_updated_id)
    render "api/groups/index"
  end

  def show
    @group = current_user.groups.find_by(id: params[:id])
    if @group
      @questions, @answer_choices = @group.dependencies
        .values_at(:questions, :answer_choices)
      render "api/groups/show"
    else
      render json: ["Group does not exist!"], status: 404
    end
  end

#Expecting data of form: { group: {:title}, question_ids: [] }

  def create
    @group = Group.new(group_params)
    @group.user = current_user
    if @group.save
      @questions = @group.dependencies.values_at(:questions)
    else
    end
#     @group = Group.new(group_params)
#     @group.user = current_user
#      if @group.save
#       questions = current_user.questions.where(id: params[:question_ids] )
#
#       questions.each do |question|
#         question.group_id = @group.id
#         question.save!
#       end
# #How would I get these things to be available in my views?
#       @last_updated_id = @group.id
#       @groups = current_user.groups.includes(:questions)
#       @questions = current_user.questions.includes(:answer_choices)
#       render "api/groups/index"
#     else
#
#       render json: @group.errors.full_messages, status: 422
#     end
  end

#Expecting data of form: { question_ids: [] } + wildcard of group_id
#NB: Create GroupQuestions Class that takes in params[:question_ids]
 # and make a manual save method.

  def group_questions
    questions = current_user.questions.where(id: params[:question_ids])

    questions.each do |question|
      question.group_id = params[:group_id]
      question.save!
    end

    @last_updated_id = params[:group_id]
    @groups = current_user.groups.includes(:questions)
    @questions = current_user.questions.includes(:answer_choices)
    render "api/groups/index"
  end

  def destroy
    @group = Group.find_by(id: params[:id])
    if @group
      #NB: Group.dependencies
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
