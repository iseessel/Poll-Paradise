import merge from 'lodash/merge'

//[: }]
export const allPolls = (groups, questions) => {
  let allQuestions = Object.assign({}, questions)
  const polls = []
  let groupKey
  let groupQuestions
  let question
  Object.values(groups).forEach((group) => {

    groupQuestions = group.questionIds.map((questionId) => {
      question = questionIndexSelector(allQuestions[questionId])
      delete allQuestions[questionId]
      return question
    })

    groupKey = {title: group.title, id: group.id, questions: groupQuestions}
    polls.push(groupKey)
  });


  polls.push(ungroupedQuestions(allQuestions))
  return polls
};

const ungroupedQuestions = (questions) => {
  const ungroupedQuestions = []
  let valuesSelected

  Object.values(questions).forEach((question) => {

    valuesSelected = questionIndexSelector(question)
    ungroupedQuestions.push(valuesSelected)
  })
  return {title: "Ungrouped", id: null, questions: ungroupedQuestions}
}

const questionIndexSelector = (question) => {

  return {user: question.userId,
    body: question.body, id: question.id,
    active: question.active }

}
