import { combineReducers } from 'redux';
import QuestionReducer from './entities/question_reducer.js';
import AnswerChoiceReducer from './entities/answer_choice_reducer.js'
import GroupReducer from './entities/group_reducer.js'

export default combineReducers({
  groups: GroupReducer,
  questions: QuestionReducer,
  answer_choices: AnswerChoiceReducer
});
