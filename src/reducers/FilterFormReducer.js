import assignIn from 'lodash.assignin';
import {
  FILTER_CHANGED,
  SET_FILTER_RANGES
} from '../actions/types';

const INITIAL_STATE = {
  limitAge:         { min: 0, max: 100 },
  limitYearsActive: { min: 0, max: 100 },
  age:              { min: 0, max: 100 },
  yearsActive:      { min: 0, max: 100 },
  name:             '',
  sort:             'name'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_CHANGED:
      return assignIn({}, state, action.payload);
    case SET_FILTER_RANGES:
      return assignIn({}, state, clampFilterRanges(state, action.payload));
    default:
      return state;
  }
};

function clampFilterRanges(prevState, newLimits) {
  let { age, yearsActive } = prevState;
  let { limitAge, limitYearsActive } = newLimits;

  return {
    age: {
      min: Math.min(limitAge.max, Math.max(age.min, limitAge.min)),
      max: Math.max(limitAge.min, Math.min(age.max, limitAge.max))
    },
    yearsActive: {
      min: Math.min(limitYearsActive.max, Math.max(yearsActive.min, limitYearsActive.min)),
      max: Math.max(limitYearsActive.min, Math.min(yearsActive.max, limitYearsActive.max))
    },
    limitAge,
    limitYearsActive
  };
}