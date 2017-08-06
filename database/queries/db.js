const Artist = require('../seeds/artist');

const artists = [];
for (let i = 0; i < 20; ++i) {
    artists.push(Artist());
}

module.exports = artists;