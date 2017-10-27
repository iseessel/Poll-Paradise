import { TOGGLE_SELECTED } from '../../actions/ui_actions.js';
import merge from 'lodash/merge'


//In my selector, I am artificailly giving the ungrouped actions
//an ID of -1; in order to have the clicked state persist.

const _defaultState = {"-1": true}

function GroupUIReducer(state = _defaultState, action){

  switch(action.type){

    case TOGGLE_SELECTED:

      const newState = merge({}, state)
      const groupId = action.groupId
      if(newState.hasOwnProperty(groupId)){
        const selected = state[groupId]
        newState[groupId] = !selected
      }else{

        newState[groupId] = true
      }
      return newState

    default:

      return state
  }
}

export default GroupUIReducer;
