import * as QuestionUtil from '../util/api/question_api_util.js';
import { receiveErrors, clearErrors } from './errors.js';

export const RECEIVE_QUESTION = "RECEIVE_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS"
export const DELETE_QUESTION = "DELETE_QUESTION";

export const receiveOneQuestion = (payload) => {

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

export const receiveQuestions = (payload) => {

  return{
    type: RECEIVE_QUESTIONS,
    payload: payload
  }
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
    .then((response) => {
      
      dispatch(receiveOneQuestion(response))
    },
      (err) => {
        
        dispatch(receiveErrors(err.responseJSON))
      }
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

export const activateQuestion = (id) => (dispatch) => {
  return QuestionUtil.activateQuestion(id)
    .then((response) => dispatch(receiveQuestions(response)),
      (err) => dispatch(receiveErrors(err.responseJSON)))
}

export const fetchUsersActiveQuestion = (username) => dispatch => {
  return QuestionUtil.fetchUsersActiveQuestion(username)
    .then((response) => dispatch(receiveOneQuestion(response)),
    (err) => dispatch(receiveErrors(err.responseJSON)))
}
