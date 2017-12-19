class GroupCreate
  attr_reader :group_errors
  def initialize(group_params, question_ids, user)
    @group_params = group_params
    @current_user = user
    @questions = user.questions.where(id:
      question_ids )
  end

  def create
    group = Group.new(@group_params)
    group.user = @current_user
    add_questions_to_group(group)
    if group.save
        group
    else
      @group_errors = group.errors.full_messages
      false
    end
  end

  private

  def add_questions_to_group(group)
    @questions.each do |question|
      group.questions << question
    end
  end

end
