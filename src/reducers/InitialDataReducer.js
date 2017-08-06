import { LOAD_INITIAL_DATA } from '../actions/types';
import initialData from '../../database/data.json'

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_INITIAL_DATA:
      return initialData;
    default:
      return state;
  }
};