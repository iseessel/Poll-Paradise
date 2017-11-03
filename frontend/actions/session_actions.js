import * as SessionUtil from '../util/session_api_util';
import { receiveErrors } from './errors.js';
import { clearGroups } from './group_actions.js'
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

export const receiveCurrentUser = (user) => {
  //user is expected to be of form: { id: , :email, :fnmame, :last_name }
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: user
  };
};

export const signupAction = (user) => (dispatch) => {
  return SessionUtil.signup(user)
    .then((response) => dispatch(receiveCurrentUser(response)),
      (err) => dispatch(receiveErrors(err.responseJSON)));
};

//logout has no argument b/c we have access to current user
export const logoutAction = () => (dispatch) => {
  return SessionUtil.logout()
    .then((response) => dispatch(receiveCurrentUser(null)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearGroups()))
};

export const loginAction = (user) => (dispatch) => {
  return SessionUtil.login(user)
    .then((response) => dispatch(receiveCurrentUser(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
};
