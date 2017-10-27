import { combineReducers } from 'redux';
import ErrorsReducer from './errors_reducer.js';
import GroupUIReducer from './group_ui_reducer.js'

export default combineReducers({
  errors: ErrorsReducer,
  groupsSelected: GroupUIReducer,
});
