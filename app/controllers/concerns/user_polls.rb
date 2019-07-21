class UserPolls
  def initialize(user)
    @user = user
  end

  def dependencies
    {
      groups: groups,
      questions: questions,
      last_updated_id: last_updated_question_id
    }
  end

  def groups
    @user.groups.eager_load(:questions)
  end

  def questions
    @user.questions.eager_load(:answer_choices)
  end

  def last_updated_question_id
    active_question_group = @user.active_question&.group
    active_question_group ? active_question_group.id : -1
  end
end
