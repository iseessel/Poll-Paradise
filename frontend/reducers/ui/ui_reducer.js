import { combineReducers } from 'redux';
import ErrorsReducer from './errors_reducer.js';
import GroupUIReducer from './group_ui_reducer.js'
import ModalReducer from './modal_reducer.js'
import UserInputReducer from './user_input_reducer.js'

export default combineReducers({
  errors: ErrorsReducer,
  groupsSelected: GroupUIReducer,
  modal: ModalReducer,
  userInput: UserInputReducer
});
