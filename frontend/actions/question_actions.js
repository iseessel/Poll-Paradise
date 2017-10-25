import * as QuestionUtil from '../util/api/question_api_util.js';
import { receiveErrors, clearErrors } from './errors.js';

export const RECEIVE_QUESTION = "RECEIVE_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

export const receiveOneQuestion = (payload) => {
  debugger
  return {
    type: RECEIVE_QUESTION,
    payload: payload
  };
};

export const deleteQuestionAction = (payload) => {
  return {
    type: DELETE_QUESTION,
    payload: payload
  };
}

//NB: We do not need the users id,
// b/c the controller will find the current_user
export const retrieveOneQuestion = (id) => (dispatch) => {
  return QuestionUtil.fetchOneQuestion(id)
    .then((response) => {dispatch(receiveOneQuestion(response))},
      (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearErrors()))
};

export const createQuestion = (data) => (dispatch) => {
  return QuestionUtil.createQuestion(data)
    .then((response) => dispatch(receiveOneQuestion(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearErrors()))
};

export const updateQuestion = (id, data) => (dispatch) => {
  return QuestionUtil.updateQuestion(id, data)
    .then((response) => dispatch(receiveOneQuestion(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearErrors()))
};

export const deleteQuestion = (id) => (dispatch) => {
  return QuestionUtil.deleteQuestion(id)
    .then((response) => dispatch(deleteQuestionAction(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    ).then(() => dispatch(clearErrors()))
};
