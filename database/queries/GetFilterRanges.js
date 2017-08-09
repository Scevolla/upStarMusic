import { maxPropOfArray, minPropOfArray } from '../../helpers/utils.js';
const data = require('../data.json');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
        const ranges = {
            limitAge: {
                max: maxPropOfArray(data, 'age'),
                min: minPropOfArray(data, 'age'),
            },
            limitYearsActive: {
                max: maxPropOfArray(data, 'yearsActive'),
                min: minPropOfArray(data, 'yearsActive'),
            }       
        }; 
        resolve(ranges);
    }, 500);
  });
};