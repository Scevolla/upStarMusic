import { combineReducers } from 'redux';
import filterFormReducer from './FilterFormReducer';
import artistsReducer from './ArtistsReducer';
import ErrorReducer from './ErrorReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  filterForm: filterFormReducer,
  artists: artistsReducer,
  errorMessage: ErrorReducer,
  selection: SelectionReducer
});