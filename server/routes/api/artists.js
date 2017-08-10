var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var assignIn = require('lodash.assignin');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api/artists', function(req, res) {
  var aArtists = searchArtists(req.body, req.app.get('aData')); 
  res.json(aArtists);
});

router.put('/api/artists', function(req, res) {
  feedbackData.unshift(req.body);
  fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function(err) {
    if (err) {
      console.log(err);
    }
  });
  res.json(feedbackData);
});

function searchArtists(_oFilters, aData) {
  const LIMIT = 50;
  const oFilters = assignIn({
      age: { min: 0, max: 100 },
      yearsActive: { min: 0, max: 100 },
      name: '',
      sort: 'name'
  }, _oFilters);

  var aArtists = aData;
  aArtists = aArtists.filter(a => a.name.toLowerCase().indexOf(oFilters.name.toLowerCase()) !== -1);
  aArtists = aArtists.filter(a => a.age >= oFilters.age.min && a.age <= oFilters.age.max);
  aArtists = aArtists.filter(a => a.yearsActive >= oFilters.yearsActive.min && a.yearsActive <= oFilters.yearsActive.max);
  aArtists = aArtists.sort((a, b) => {
    return a[oFilters.sort] >= b[oFilters.sort] ? 1 : -1;
  });
  aArtists.splice(LIMIT, Number.MAX_VALUE);

  return aArtists;
}

// function debugWrite() {
//   if (arguments.length == 0) {
//     return;
//   }
//   for (var i = 0; i < arguments.length; ++i) {
//     if (typeof arguments[i] == 'string') {
//       fs.appendFileSync('log.txt', arguments[i]);
//     } else {
//       fs.appendFileSync('log.txt', JSON.stringify(arguments[i], null, 4));
//     }
//   }

//   fs.appendFileSync('log.txt', '\r\n\r\n');
// }

module.exports = router;