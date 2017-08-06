import assignIn from 'lodash.assignin';
import {
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST,
  ARTISTS_NEXT_PAGE,
  ARTISTS_PREV_PAGE
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  offset: 0,
  displayCount: 10,
  totalCount: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ARTISTS:
      return assignIn({}, state, {
        totalCount: action.payload.length,
        all: action.payload,
        offset: 0
      })
    // case FIND_ARTIST:
    //   return _.extend({}, state, { artist: action.payload });
    // case RESET_ARTIST:
    //   return _.extend({}, state, { artist: null });
    case ARTISTS_NEXT_PAGE:
      var newOffset = state.offset + state.displayCount;
      return assignIn({}, state, {offset: newOffset});
    case ARTISTS_PREV_PAGE:
      var newOffset = state.offset - state.displayCount;
      return assignIn({}, state, {offset: newOffset});
    default:
      return state;
  }
};