import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import EntitiesReducer from './entities_reducer';
import UIReducer from './ui/ui_reducer'


export default combineReducers({
  session: SessionReducer,
  ui: UIReducer,
  entities: EntitiesReducer
});
