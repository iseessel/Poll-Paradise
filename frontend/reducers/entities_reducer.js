import { combineReducers } from 'redux';
import QuestionReducer from './entities/question_reducer.js';
import AnswerChoiceReducer from './entities/answer_choice_reducer.js'

export default combineReducers({
  questions: QuestionReducer,
  answer_choices: AnswerChoiceReducer
});
