const assignIn = require('lodash.assignin');
const data = require('../data.json');

const LIMIT = 100;

/**
 * Searches through the Artist collection
 * @param {object} oFilters An object with a name, sort, age, and yearsActive
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */
module.exports = (_oFilters) => {
  const oFilters = assignIn({
      age: { min: 0, max: 100 },
      yearsActive: { min: 0, max: 100 },
      name: '',
      sort: 'name'
  }, _oFilters);

  let aArtists = data;
  aArtists = aArtists.filter(a => a.name.toLowerCase().indexOf(oFilters.name.toLowerCase()) !== -1);
  aArtists = aArtists.filter(a => a.age >= oFilters.age.min && a.age <= oFilters.age.max);
  aArtists = aArtists.filter(a => a.yearsActive >= oFilters.yearsActive.min && a.yearsActive <= oFilters.yearsActive.max);
  aArtists = aArtists.sort((a, b) => {
    return a[oFilters.sort] >= b[oFilters.sort] ? 1 : -1;
  });
  aArtists.splice(LIMIT, Number.MAX_VALUE);

  return new Promise((resolve, reject) => {
    resolve(aArtists);
  });
};