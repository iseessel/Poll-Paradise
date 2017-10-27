import * as answerChoiceUtil from '../util/answer_choice_api_util.js';

export const RECEIVE_ANSWER = "RECEIVE_ANSWER"


export const chooseAnswer = (id) => (dispatch) => {
  return answerChoiceUtil.chooseAnswer(id)
    .then((response) => dispatch(receiveAnswerChoice()))
}
