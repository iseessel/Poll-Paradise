import { TOGGLE_SELECTED, ENSURE_SELECTED } from '../../actions/ui_actions.js';
import { RECEIVE_GROUPS } from '../../actions/group_actions.js'
import merge from 'lodash/merge'


//In my selector, I am artificailly giving the ungrouped actions
//"null" in order to have the ungrouped questions automatically opened.

const _defaultState = {"null": true}

function GroupUIReducer(state = _defaultState, action){

  switch(action.type){

    case TOGGLE_SELECTED:
      let newState = merge({}, state)
      let groupId = action.groupId
      if(newState.hasOwnProperty(groupId)){
        const selected = state[groupId]
        newState[groupId] = !selected
      }else{
        newState[groupId] = true
      }
      return newState

    case ENSURE_SELECTED:
      newState = merge({}, state)
      groupId = action.groupId
      newState[groupId] = true

      return newState


    case RECEIVE_GROUPS:
      newState = merge({}, state)
      //Makes the currently shared question's group automatically opened.
      newState[action.payload.lastUpdatedGroupId] = true

      return newState

    default:
      return state
  }
}

export default GroupUIReducer;
