import { TOGGLE_QUESTION_TO_BE_GROUPED,
  CLEAR_CHECK_BOXES } from '../../actions/ui_actions.js'
import { RECEIVE_GROUPS } from '../../actions/group_actions.js'
import merge from 'lodash/merge';

const _defaultState = {groupedQuestions: [], }

function UserInputReducer(state = _defaultState, action){

  switch(action.type){

    case TOGGLE_QUESTION_TO_BE_GROUPED:

      let groupedQuestions = state.groupedQuestions.slice(0)
      let questionId = action.questionId
      let questionIndex = groupedQuestions.indexOf(questionId)
      if(questionIndex === -1){

        groupedQuestions.push(action.questionId)
      }else{

        groupedQuestions.splice(questionIndex, 1)
      }

      return Object.assign({}, state,
        { groupedQuestions: groupedQuestions } )

    case CLEAR_CHECK_BOXES:
      return _defaultState

    case RECEIVE_GROUPS:
      return _defaultState

    default:
      return state
  }
}

export default UserInputReducer
