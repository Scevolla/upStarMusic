import {
  SELECT_ARTIST,
  DESELECT_ARTIST,
  RESET_SELECTION
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_ARTIST:
      let newState = state.slice();
      newState.push(action.payload);
      return newState;
    case DESELECT_ARTIST:
      return state.filter(e => e !== action.payload);
    case RESET_SELECTION:
      return [];
    default:
      return state;
  }
};