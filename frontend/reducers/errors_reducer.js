import merge from 'lodash/merge';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';
import { CLEAR_ERRORS, RECEIVE_ERRORS }  from '../actions/errors.js';

const _defaultState = [];

function ErrorsReducer(state = _defaultState, action){

  switch(action.type){

    case RECEIVE_CURRENT_USER:
      return _defaultState;

    case RECEIVE_ERRORS:
      ;
      return Array.isArray(action.errors) ?
        action.errors : [action.errors]

    case CLEAR_ERRORS:
      return _defaultState;

    default:
      return state;
  }
}

export default ErrorsReducer;
