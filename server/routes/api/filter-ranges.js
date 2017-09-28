const express = require('express');
const router = express.Router();

router.get('/api/filter-ranges', function(req, res) {
  var db = req.app.get('db');
  getFilterRanges(db)
  .then((oRanges) => res.json(oRanges))
  .catch((err) => {
    console.log(err);
    res.json({err: 'An error occured while getting form filter ranges'});
  });
});

function getFilterRanges(db) {
  var oRanges = {
    limitAge: {max: 100, min: 0},
    limitYearsActive: {max: 100, min: 0}
  };
  return new Promise(function(resolve, reject) {
    db.collection('artists').find().sort({'age': -1}).limit(1).toArray()
    .then((aArtists) => oRanges.limitAge.max = aArtists[0].age)
    .then(() => db.collection('artists').find().sort({'age': 1}).limit(1).toArray())
    .then((aArtists) => oRanges.limitAge.min = aArtists[0].age)
    .then(() => db.collection('artists').find().sort({'yearsActive': -1}).limit(1).toArray())
    .then((aArtists) => oRanges.limitYearsActive.max = aArtists[0].yearsActive)
    .then(() => db.collection('artists').find().sort({'yearsActive': 1}).limit(1).toArray())
    .then((aArtists) => { 
      oRanges.limitYearsActive.min = aArtists[0].yearsActive;
      resolve(oRanges);
    })
    .catch((err) => reject(err));
  })
}

module.exports = router;