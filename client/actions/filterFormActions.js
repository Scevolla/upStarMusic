import * as queries from './queries.js';
import {
  FILTER_CHANGED,
  SET_FILTER_RANGES
} from './types';


export const filterChanged = (values) => {
  return { type: FILTER_CHANGED, payload: values };
};

export const setFilterRanges = () => (dispatch) =>
  queries.queryFilterRanges()
    .then(result => {
      return dispatch({ type: SET_FILTER_RANGES, payload: result })
    })
    .catch(error => {
      console.log('setFilterRanges actionCreator error: ', error);
    });