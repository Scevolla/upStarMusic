import { combineReducers } from 'redux';
//import initialDataReducer from './InitialDataReducer';
//import { reducer as formReducer } from 'redux-form';
import filterFormReducer from './FilterFormReducer';
import artistsReducer from './ArtistsReducer';
//import ErrorReducer from './ErrorReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  //initialData: initialDataReducer,
  //form: formReducer,
  filterForm: filterFormReducer,
  artists: artistsReducer,
  //errors: ErrorReducer,
  selection: SelectionReducer
});