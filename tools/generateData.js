const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Determine count of generated artists as first argument');
    process.exit();
}

const nCount = parseInt(args[0]);
if (!nCount || nCount < 0) {
    console.log('Count of artist (first argument) must be an integer positive value');
    process.exit();
}

console.log('start generating array of artists...\n');

const Artist = require('./artist');
const fs = require('fs');
const path = require('path');

var artists = [];
for (var i = 0; i < nCount; ++i) {
    artists.push(Artist(i));
}
const sArtists = JSON.stringify(artists);
fs.writeFile(path.join(__dirname, './../server/database/data.json'), sArtists, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Artists was saved!");
});
const sNextArtistID = JSON.stringify(artists.length);
fs.writeFile(path.join(__dirname, './../server/database/nextArtistID.json'), sNextArtistID, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("NextArtistID was saved!");
});