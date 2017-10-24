import * as QuestionUtil from '../util/Api/question_api_util.js';
import { receiveErrors } from './errors.js';

export const RECEIVE_QUESTION = "RECEIVE_QUESTION";
export const DELETE_QUESTION = "DELETE_QUESTION";

export const receiveOneQuestionAction = (payload) => {
  return {
    type: RECEIVE_QUESTION,
    payload: payload
  };
};

export const deleteQuestionAction = (id) => {
  return {
    type: DELETE_QUESTION,
    id: id
  };
}

//NB: We do not need the users id,
// b/c the controller will find the current_user
export const retrieveOneQuestion = (id) => (dispatch) => {
  return QuestionUtil.fetchOneQuestion(id)
    .then((response) => dispatch(receiveOneQuestionAction(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
};

export const createQuestion = (data) => (dispatch) => {
  return QuestionUtil.createQuestion(data)
    .then((response) => dispatch(receiveQuestion(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
};

export const updateQuestion = (id, data) => (dispatch) => {
  return QuestionUtil.updateQuestion(id, data)
    .then((response) => dispatch(receiveQuestion(response)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
};

export const deleteQuestion = (id) => (dispatch) => {
  return QuestionUtil.deleteQuestion(id)
    .then((response) => dispatch(deleteQuestion(id)),
      (err) => dispatch(receiveErrors(err.responseJSON))
    );
};
