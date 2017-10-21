import * as SessionUtil from './util/session_api_util'

export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS"
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"

export const receiveCurrentUser(currentUser) = (user) => {
  //user is expected to be of form: { id: , :email, :fnmame, :lname }
  return {
    type: RECEIVE_CURRENT_USER,
    currentUser: user
  };
};

export const receiveSessionErrors(errors) = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors: errors
  };
};

export const signupAction(user) = (dispatch) => {
  return SessionUtil.signup(user)
    .then((response) => dispatch(receiveCurrentUser(user)))
};

//logout has no argument b/c we have access to current user
export const logoutAction() = (dispatch) => {
  return SessionUtil.logout()
    .then((response) => dispatch(receiveCurrentUser(null)))
};

export const loginAction(user) = (dispatch) => {
  return SessionUtil.login(user)
    .then((response) => dispatch(receiveCurrentUser(user)))
};
