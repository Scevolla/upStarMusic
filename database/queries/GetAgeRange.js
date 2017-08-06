import { maxPropOfArray, minPropOfArray } from '../../helpers/utils.js';
const db = require('./db');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  return new Promise((resolve, reject) => {
    const range = {
      max: maxPropOfArray(db, 'age'),
      min: minPropOfArray(db, 'age'),
    };
    
    resolve(range);
  });
};