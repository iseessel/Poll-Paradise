import * as answerChoiceUtil from '../util/api/answer_choice_api_util.js';

export const RECEIVE_ANSWER = "RECEIVE_ANSWER"

export const CLEAR_ANSWER_CHOICES = "CLEAR_ANSWER_CHOICES"

export const chooseAnswer = (id) => (dispatch) => {
  return answerChoiceUtil.chooseAnswer(id)
    .then((response) => dispatch(receiveAnswerChoice()))
}
