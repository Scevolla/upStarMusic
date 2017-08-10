global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}
global.debugWrite = function() {
  if (arguments.length == 0) {
    return;
  }
  for (var i = 0; i < arguments.length; ++i) {
    if (typeof arguments[i] == 'string') {
      fs.appendFileSync('log.txt', arguments[i]);
    } else {
      fs.appendFileSync('log.txt', JSON.stringify(arguments[i], null, 4));
    }
  }
  fs.appendFileSync('log.txt', '\r\n\r\n');
}

const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
var dataFile = require('./database/data.json');
var nNextArtistID = require('./database/nextArtistID.json');

app.set('port', process.env.PORT || 3050);
app.set('aData', dataFile);
app.set('nNextArtistID', parseInt(nNextArtistID) || dataFile.length);

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/api/'));
app.use(require('./routes/api/filter-ranges.js'));
app.use(require('./routes/api/artists.js'));
app.use(require('./routes/api/artists.id.js'));

// if (process.env.NODE_ENV !== 'production') {
//   console.log('Using webpack-dev-middleware');
//   const webpackMiddleware = require('webpack-dev-middleware');
//   const webpack = require('webpack');
//   const webpackConfig = require('../webpack.config.js');
//   app.use(webpackMiddleware(webpack(webpackConfig)));
// } else {
//   app.use(express.static(path.join(__dirname, 'public')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/index.html'));
//   });
// }

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});