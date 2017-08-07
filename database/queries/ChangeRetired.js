const aData = require('../data.json');

/**
 * Sets a group of Artists as retired
 * @param {array} aIDs - An array of the _id's of of artists to update
 * @param {bool} bSetRetired - retire or unretire
 * @return {promise} A promise that resolves after the update
 */
module.exports = (aIDs, bSetRetired) => {
  return new Promise((resolve, reject) => {
    aData.filter(a => aIDs.indexOf(a._id) !== -1)
      .forEach(a => a.retired = bSetRetired);

    resolve();
  });
};