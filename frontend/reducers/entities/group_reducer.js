import merge from 'lodash/merge'
import { RECEIVE_GROUPS, RECEIVE_GROUP }
  from '../../actions/group_actions.js'
import { RECEIVE_QUESTION, DELETE_QUESTION }
  from '../../actions/question_actions.js';


const _defaultState = {}

function GroupReducer(state = _defaultState, action){
  switch(action.type){
    case RECEIVE_GROUPS:
      // let newState = action.payload.groups
      // return merge({}, state, newState);
      return action.payload.groups

    case RECEIVE_GROUP:
      const group = action.payload.group
      let newState = {[group.id]: group}
      return merge({}, state, newState);

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
      let question = action.payload.question
      groupId = question.group_id

      if(groupId && !groupQuestionIds.includes(question.id)){
        let groupQuestionIds = newState[groupId].questionIds
        groupQuestionIds.includes(question.id) ?
          groupQuestionIds.push(question.id) :
          null
      }
      return newState;

    // case RECEIVE_QUESTION:
    //   return _defaultState;

    default:

      return state
  }
}

export default GroupReducer;
