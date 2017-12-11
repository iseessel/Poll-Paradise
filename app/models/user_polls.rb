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
    @user.groups
    .eager_load(:questions)
  end

  def questions
    @user.questions
      .eager_load(:answer_choices)
  end

  def last_updated_question_id
    active_question = @user.active_question
    active_question ? active_question.id : -1
  end

end
