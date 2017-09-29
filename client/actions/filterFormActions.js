import * as queries from './queries.js';
import 'whatwg-fetch';
import {
  FILTER_CHANGED,
  SET_FILTER_RANGES
} from './types';


export const filterChanged = (values) => {
  return { type: FILTER_CHANGED, payload: values };
};

export const setFilterRanges = () => (dispatch) =>
  fetch('/api/filter-ranges')
  .then(queries.checkStatus)
  .then(queries.parseJSON)
  .then(queries.checkCustomErrors)
  .then((oFilterFanges) => dispatch({ type: SET_FILTER_RANGES, payload: oFilterFanges }))
  .catch((error) => {
    console.log('setFilterRanges actionCreator error: ', error);
  });