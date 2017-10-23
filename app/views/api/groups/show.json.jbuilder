json.partial! 'api/groups/group', group: @group

json.questions do
  @questions.each do |question|
    json.set! question.id do
      json.extract! question, :answer_choice_ids
      json.partial! 'api/questions/question', question: question
    end
  end
end

json.answer_choices do
  @answer_choices.each do |answer_choice|
    json.set! answer_choice.id do
      json.partial! 'api/answer_choices/answer_choice',
        answer_choice: answer_choice
    end
  end
end
