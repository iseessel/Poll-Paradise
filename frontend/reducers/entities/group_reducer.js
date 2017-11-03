import merge from 'lodash/merge'
import { RECEIVE_GROUPS, RECEIVE_GROUP, DELETE_GROUP }
  from '../../actions/group_actions.js'
import { RECEIVE_QUESTION, DELETE_QUESTION }
  from '../../actions/question_actions.js';


const _defaultState = {}

function GroupReducer(state = _defaultState, action){
  let newState
  switch(action.type){
    case RECEIVE_GROUPS:
       if(action.payload.groups){
        return action.payload.groups
      }else{
        return _defaultState
      }

    case RECEIVE_GROUP:
      const group = action.payload.group
      if(group){
        newState = {[group.id]: group}
        return merge({}, state, newState);
      }else{
        return _defaultState
      }
      
    case DELETE_GROUP:
      newState = merge({}, state)
      delete newState[action.payload.id]
      return newState

    case DELETE_QUESTION:
      newState = merge({}, state)

      let groupId = action.payload.groupId

      if(groupId && newState[groupId]){
        const questionIds = newState[groupId].questionIds
        const indexToDelete = questionIds.indexOf(action.payload.id)
        questionIds.splice(indexToDelete, 1)
      }
      return newState

    case RECEIVE_QUESTION:
      newState = merge({}, state)
      ;
      let question = action.payload.question
      groupId = question.groupId
      let groupQuestionIds = groupId ? newState[groupId].questionIds
        : []
      if(groupId && !groupQuestionIds.includes(question.id)){
          groupQuestionIds.push(question.id)
      }
      return newState;

    default:

      return state
  }
}

export default GroupReducer;
