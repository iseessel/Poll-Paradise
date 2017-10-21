import merge from 'lodash/merge';
import { RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER } from '../actions/session_actions.js';

const _defaultState = [];

function SessionErrorsReducer(state = _defaultState, action){
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return _defaultState;

    case RECEIVE_SESSION_ERRORS:
      return action.errors;

    default:
      return state;
  }
}

export default SessionErrorsReducer;
