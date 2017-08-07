const assignIn = require('lodash.assignin');
const aData = require('../data.json');

/**
 * Edits a single artist in the Artists collection
 * @param {string} _id - The ID of the artist to edit.
 * @param {object} oArtistProps - An object with a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves when the record is edited
 */
module.exports = (_id, oArtistProps) => {
  const oArtist = aData.find(a => a._id == _id);
  assignIn(oArtist, oArtistProps);

  return new Promise((resolve, reject) => {
    resolve();
  });
};