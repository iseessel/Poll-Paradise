import merge from 'lodash/merge'
import { RECEIVE_GROUPS, RECEIVE_GROUP,
  DELETE_GROUP, CLEAR_GROUPS }
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

    case CLEAR_GROUPS:

      return _defaultState;

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
      let question = action.payload.question
      groupId = question.groupId
      if(groupId){
        let groupQuestionIds = newState[groupId]
          ? newState[groupId].questionIds
          : []
        groupQuestionIds.includes(question.id) ?
          null :
          groupQuestionIds.push(question.id)
      }

      return newState;

      // let question = action.payload.question
      // groupId = question.group_id
      // let groupQuestionIds = newState[groupId] ? newState[groupId].questionIds
      //   : null
      // if(groupId && !groupQuestionIds.includes(question.id)){
      //   groupQuestionIds.includes(question.id) ?
      //     null :
      //     groupQuestionIds.push(question.id)
      // }

    default:
      return state
  }
}

export default GroupReducer;
