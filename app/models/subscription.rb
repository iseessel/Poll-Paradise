class Subscription

  def initialize(answer_choice)
    @answer_choice = answer_choice
  end

  def subscription_channel
    'update_question_' + @answer_choice.question.id.to_s
  end

  def subscribe
    Pusher.trigger(subscription_channel,
      'update_answer_choices', {id: @answer_choice.id,
        times_chosen: @answer_choice.times_chosen } )
  end

end
