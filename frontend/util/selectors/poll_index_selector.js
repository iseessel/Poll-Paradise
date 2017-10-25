// { id: {title: questions: []},
import merge from 'lodash/merge'


export const allPolls = (groups, questions) => {
  let allQuestions = Object.assign({}, questions)
  const polls = []
  let groupkey
  let groupQuestions
  let question
  Object.values(groups).forEach((group) => {
    groupQuestions = group.question_ids.map((question_id) => {
      question = questions[question_id]
      delete questions[question_id]
      return question
    })

    groupKey = {title: group.title, questions: questions}
    polls.push({id: groupKey })
  });

  const ungrouped_questions = []
  let valuesSelected
  Object.values(questions).forEach((question) => {
    valuesSelected = {user: question.user_id,
      body: question.body, id: question.id}
    ungrouped_questions.push(valuesSelected)
  })
  polls.push({ __ungrouped: ungrouped_questions  })

  return polls
};
