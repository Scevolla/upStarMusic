global.rootRequire = function(name) {
    return require(__dirname + '/' + name);
}

const express = require('express');
const path = require('path');
const app = express();
var dataFile = require('./database/data.json');

app.set('port', process.env.PORT || 3050);
app.set('aData', dataFile);

app.use(express.static(path.join(__dirname, 'public')));
app.use(require('./routes/api/'));
app.use(require('./routes/api/filter-ranges.js'));

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