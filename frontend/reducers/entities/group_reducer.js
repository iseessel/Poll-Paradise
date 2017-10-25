import merge from 'lodash/merge'
import { RECEIVE_GROUPS, RECEIVE_GROUP }
  from '../../actions/group_actions.js'
import { RECEIVE_QUESTION, DELETE_QUESTION }
  from '../../actions/question_actions.js';


const _defaultState = {}

function GroupReducer(state = _defaultState, action){
  switch(action.type){
    case RECEIVE_GROUPS:

      let newState = action.payload.groups
      return merge({}, state, newState);

    case RECEIVE_GROUP:
      const group = action.payload.group
      newState = {[group.id]: group}
      return merge({}, state, newState);

    case DELETE_QUESTION:
      newState = merge({}, state)
      const groupId = action.payload.group_id
      if(groupId){
        const questionIds = newState[groupId].question_ids
        const indexToDelete = questionIds.indexOf(action.payload.id)
        questionIds.splice(indexToDelete, 1)
      }
      return newState

    default:
      return state
  }
}

export default GroupReducer;
