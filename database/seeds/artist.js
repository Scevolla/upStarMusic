const faker   = require('faker');
const utils   = require('../../helpers/utils.js');
const GENRES  = require('../constants').GENRES;
const randomInt = utils.randomInt;
const randomEntry = utils.randomEntry;

module.exports = function(id) {
  return {
    _id: id,
    name: faker.name.findName(),
    age: randomInt(15, 45),
    yearsActive: randomInt(0, 15),
    image: faker.image.avatar(),
    genre: getGenre(),
    website: faker.internet.url(),
    netWorth: randomInt(0, 5000000),
    labelName: faker.company.companyName(),
    retired: faker.random.boolean(),
    albums: getAlbums()
  };
}

function getAlbums() {
  var albums = [];
  for (var i = randomInt(0, 5); i > 0; --i) {
    const copiesSold = randomInt(0, 1000000);
    albums.push({
      title: faker.random.words().toUpperCase(),
      date: faker.date.past(),
      copiesSold,
      numberTracks: randomInt(1, 20),
      image: getAlbumImage(),
      revenue: copiesSold * 12.99
    });
  }
  return albums;
}

function getAlbumImage() {
  const types = Object.keys(faker.image);
  const method = randomEntry(types);

  return faker.image[method]();
}

function getGenre() {
  return randomEntry(GENRES);
}