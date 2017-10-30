import merge from 'lodash/merge';
import { RECEIVE_QUESTION, DELETE_QUESTION }  from '../../actions/question_actions.js';
import { CLEAR_ANSWER_CHOICES } from '../../actions/answer_choice_actions.js'
const _defaultState = {};

function AnswerChoiceReducer(state = _defaultState, action){
  switch(action.type){

    case CLEAR_ANSWER_CHOICES:
      return _defaultState

    case RECEIVE_QUESTION:
      const answerChoices = action.payload.answerChoices
      return merge({}, state, answerChoices)

    case DELETE_QUESTION:
      const newState = merge({}, newState, state)
      action.payload.answerChoiceIds
        .forEach((answerChoiceId) => {
          delete newState[answerChoiceId]
        })
      return newState

    default:
      return state;
  }
}

export default AnswerChoiceReducer;
