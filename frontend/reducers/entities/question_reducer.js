import merge from 'lodash/merge';
import { RECEIVE_QUESTION, DELETE_QUESTION }  from '../../actions/question_actions.js';

const _defaultState = {};

function QuestionReducer(state = _defaultState, action){
  switch(action.type){

    case RECEIVE_QUESTION:
      const question = action.payload.question
      const newState = {[question.id]: question}
      return merge({}, state, newState)

    default:
      return state;
  }
}

export default QuestionReducer;
