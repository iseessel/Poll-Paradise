import merge from 'lodash/merge'

//[: }]
export const allPolls = (groups, questions) => {
  debugger
  let allQuestions = Object.assign({}, questions)
  const polls = []
  let groupKey
  let groupQuestions
  let question
  debugger
  Object.values(groups).forEach((group) => {
    debugger
    groupQuestions = group.question_ids.map((question_id) => {
      question = questionIndexSelector(allQuestions[question_id])
      delete allQuestions[question_id]
      return question
    })

    groupKey = {title: group.title, id: group.id, questions: groupQuestions}
    polls.push(groupKey)
  });


  polls.push(ungroupedQuestions(allQuestions))
  return polls
};

const ungroupedQuestions = (questions) => {
  const ungrouped_questions = []
  let valuesSelected
  Object.values(questions).forEach((question) => {
    debugger
    valuesSelected = questionIndexSelector(question)
    ungrouped_questions.push(valuesSelected)
  })
  return {title: "ungrouped", questions: ungrouped_questions}
}

const questionIndexSelector = (question) => {
  debugger
  return {user: question.user_id,
    body: question.body, id: question.id}
}
