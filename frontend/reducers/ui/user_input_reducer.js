import { TOGGLE_QUESTION_TO_BE_GROUPED } from '../../actions/ui_actions.js'
import { RECEIVE_GROUPS } from '../../actions/group_actions.js'
import merge from 'lodash/merge';

const _defaultState = {groupedQuestions: [], }

function UserInputReducer(state = _defaultState, action){

  switch(action.type){
    case TOGGLE_QUESTION_TO_BE_GROUPED:

      let groupedQuestions = state.groupedQuestions.slice(0)

      let questionId = action.questionId
      let questionIndex = groupedQuestions.indexOf(questionId)
      questionIndex ? groupedQuestions.push(action.questionId) :
       groupedQuestions.splice(questionIndex, 1)


      return merge({}, state, { groupedQuestions: groupedQuestions } )

    case RECEIVE_GROUPS:
      return _defaultState

    default:
      return state
  }
}

export default UserInputReducer
