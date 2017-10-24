import merge from 'lodash/merge';
import { RECEIVE_QUESTION, DELETE_QUESTION }  from '../../actions/question_actions.js';

const _defaultState = {};

function AnswerChoiceReducer(state = _defaultState, action){
  switch(action.type){

    case RECEIVE_QUESTION:
      const answer_choices = action.payload.answer_choices
      return merge({}, state, answer_choices)

    default:
      return state;
  }
}

export default AnswerChoiceReducer;
