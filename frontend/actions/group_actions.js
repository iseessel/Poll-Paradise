import * as GroupUtil from '../util/Api/question_api_util.js';
import { receiveErrors, clearErrors } from './errors.js'

export const RECEIVE_GROUPS = "RECEIVE_GROUPS"
export const RECEIVE_GROUP = "RECEIVE_GROUP"
export const DELETE_GROUP = "DELETE_GROUP"

//NB: Receive Groups also returns all the questions for a user.
export const receiveGroups = (payload) => {
  return {
    type: RECEIVE_GROUPS,
    payload: payload
  };
};

export const receiveOneGroup = (payload) => {
  return {
    type: RECEIVE_GROUP,
    payload: payload
  };
}

export const deleteGroupAction = (payload) => {
  return {
    type: DELETE_GROUP,
    payload: payload
  };
}

//NB: We do not need the users id,
// b/c the controller will find the current_user

export const retrieveGroups = () => (dispatch) => {
  return GroupUtil.fetchGroups().then((response) => dispatch(receiveGroups()),
    (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearErrors))
};

export const retrieveOneGroup = (id) => (dispatch) => {
  return GroupUtil.fetchOneGroup(id)
    .then((response) => dispatch(receiveOneGroup(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearErrors()))
};

export const createGroup = (data) => (dispatch) => {
  return GroupUtil.createGroup(data)
    .then((response) => dispatch(receiveOneGroup(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearErrors()))
};

export const deleteGroup = (id) => (dispatch) => {
  return GroupUtil.deleteGroup(id)
    .then((response) => dispatch(deleteGroupAction(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearErrors()))
};
