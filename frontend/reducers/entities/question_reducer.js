import merge from 'lodash/merge';
import { RECEIVE_QUESTION, DELETE_QUESTION }  from '../../actions/question_actions.js';
import { RECEIVE_GROUPS, RECEIVE_GROUP }
  from '../../actions/group_actions.js'


const _defaultState = {};

function QuestionReducer(state = _defaultState, action){
  switch(action.type){

  case RECEIVE_QUESTION:
    let question = action.payload.question
    let newState = {[question.id]: question}
    return merge({}, state, newState)

  case RECEIVE_GROUPS:
    let questions = action.payload.questions
    return merge({}, state, questions)

  case RECEIVE_GROUP:
    questions = action.payload.questions
    return merge({}, state, questions)

  case DELETE_QUESTION:
    newState = merge({}, state)
    delete newState[action.payload.id]
    return newState

  default:
    return state;
  }
}

export default QuestionReducer;
