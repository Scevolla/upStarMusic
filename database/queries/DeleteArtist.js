const aData = require('../data.json');

/**
 * Deletes a single artist from the Artists collection
 * @param {string} _id - The ID of the artist to delete.
 * @return {promise} A promise that resolves when the record is deleted
 */
module.exports = (_id) => {
  aData.forEach((oArtist, index) => {
    if(oArtist && oArtist._id == _id) {
      aData.splice(index, 1);
    }
  });

  return new Promise((resolve, reject) => resolve());
};