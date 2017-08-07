const assignIn = require('lodash.assignin');
const aData = require('../data.json');

/**
 * Create a single artist in the artist collection.
 * @param {object} artistProps - Object containing a name, age, yearsActive, and genre
 * @return {promise} A promise that resolves with the Artist that was created
 */
module.exports = (oArtistProps) => {
  const oArtist = assignIn({},
    oArtistProps,
    {
      _id: aData.length,
      age: parseInt(oArtistProps.age) || 20,
      yearsActive: parseInt(oArtistProps.yearsActive) || 5
    }
  );
  aData.push(oArtist);

  return new Promise((resolve, reject) => {
    resolve(oArtist);
  });
};