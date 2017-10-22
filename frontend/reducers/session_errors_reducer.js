import merge from 'lodash/merge';
import { RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER, CLEAR_SESSION_ERRORS } from '../actions/session_actions.js';

const _defaultState = [];

function SessionErrorsReducer(state = _defaultState, action){
  switch(action.type){
    case RECEIVE_CURRENT_USER:
      return _defaultState;

    case RECEIVE_SESSION_ERRORS:
      return action.errors;

    case CLEAR_SESSION_ERRORS:
      return _defaultState;

    default:
      return state;
  }
}

export default SessionErrorsReducer;
