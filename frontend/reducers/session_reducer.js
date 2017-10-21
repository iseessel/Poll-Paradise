import { RECEIVE_CURRENT_USER } from '../actions/session_actions.js';
import merge from 'lodash/merge';

const _defaultState = {
  currentUser: null
};

function SessionReducer(state = _defaultState, action){
  switch(action.type){

    case RECEIVE_CURRENT_USER:
      const newState = { currentUser: action.currentUser };
      return merge({}, state, newState);

    default:
      return state;
  }
}

export default SessionReducer;
