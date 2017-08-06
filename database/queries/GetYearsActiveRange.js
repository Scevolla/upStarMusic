import { maxPropOfArray, minPropOfArray } from '../../helpers/utils.js'; 
const db = require('./db');

/**
 * Finds the lowest and highest yearsActive of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max yearsActive, like { min: 0, max: 14 }.
 */
module.exports = () => {
  return new Promise((resolve, reject) => {
    const range = {
      max: maxPropOfArray(db, 'yearsActive'),
      min: minPropOfArray(db, 'yearsActive'),
    };

    resolve(range);
  });
};
