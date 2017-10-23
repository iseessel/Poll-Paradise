json.partial! 'api/questions/question', question: @question

json.answer_choices do
  @answer_choices.each do |answer_choice|
    json.set! answer_choice.id do
      json.partial! 'api/answer_choices/answer_choice',
        answer_choice: answer_choice
    end
  end
end
