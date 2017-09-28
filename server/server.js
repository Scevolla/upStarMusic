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

const fs          = require('fs');
const express     = require('express');
const path        = require('path');
const app         = express();
const mongoClient = require('mongodb').MongoClient;
const dbConfig    = require('./config/db');

mongoClient.connect(dbConfig.url, (err, database) => {
  if (err) {
    console.log(err);
  }

  app.set('port', process.env.PORT || 3050);
  app.set('db', database);

  app.use(express.static(path.join(__dirname, 'public')));
  app.use(require('./routes/api/'));
  app.use(require('./routes/api/filter-ranges.js'));
  app.use(require('./routes/api/artists.js'));
  app.use(require('./routes/api/artists.id.js'));

  app.listen(app.get('port'), function() {
    console.log('Listening on port ' + app.get('port'));
  });
});