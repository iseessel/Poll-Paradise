json.questions do

  json.set! @question.id do

    json.partial! 'api/questions/question',
      question: @question
  end

  if @prev_activated_question && @prev_activated_question != @question
    json.set! @prev_activated_question.id do
      json.partial! 'api/questions/question',
        question: @prev_activated_question
    end
  end
end
