import merge from 'lodash/merge'
import { RECEIVE_GROUPS, RECEIVE_GROUP }
  from '../../actions/group_actions.js'

const _defaultState = {}

function GroupReducer(state = _defaultState, action){
  switch(action.type){
    case RECEIVE_GROUPS:
      debugger
      let newState = action.payload.groups
      return merge({}, state, newState);

    case RECEIVE_GROUP:
      const group = action.payload.group
      newState = {[group.id]: group}
      return merge({}, state, newState);

    default:
      return state
  }

}

export default GroupReducer;
