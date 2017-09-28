const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const assignIn   = require('lodash.assignin');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api/artists', function(req, res) {
  const db = req.app.get('db');
  if (req.query.retired) {
    changeRetired(db, req.body, req.query.retired == 'on' ? true : false)
    .then(() => res.json(''))
    .catch((err) => {
      console.log(err);
      res.json({err: 'An error occured while changing retired'});
    });
  } else {
    searchArtists(db, req.body)
    .then((aArtists) => res.json(aArtists))
    .catch((err) => {
      console.log(err);
      res.json({err: 'An error occured while searching artists'});
    });
  }  
});

router.put('/api/artists', function(req, res) {
  const db = req.app.get('db');
  db.collection('artists').find().sort({_id: -1}).limit(1).toArray()
  .then((aArtists) => aArtists[0]._id)
  .then((nID) => {
    const oArtist = createArtist(req.body, ++nID);
    return db.collection('artists').insertOne(oArtist);
  })
  .then((oResult) => res.json(oResult.insertedId))
  .catch((err) => {
      console.log(err);
      res.json({err: 'An error occured while inserting new artist'});
    });
});

/////////////////// FUNCTIONS ///////////////////////

function searchArtists(db, _oFilters) {
  const nLIMIT = 50;
  const oFilters = assignIn({
      age: { min: 0, max: 100 },
      yearsActive: { min: 0, max: 100 },
      name: '',
      sort: 'name'
  }, _oFilters);

  const oFindFilters = {
    'age': {$gte: oFilters.age.min, $lte: oFilters.age.max},
    'yearsActive': {$gte: oFilters.yearsActive.min, $lte: oFilters.yearsActive.max},
    'name': new RegExp(oFilters.name, 'i')
  };

  return new Promise((resolve, reject) => {
    db.collection('artists').find(oFindFilters)
    .sort({[oFilters.sort]: 1})
    .limit(nLIMIT)
    .toArray((err, aArtists) => { err ? reject(err) : resolve(aArtists) });
  });
}

function changeRetired(db, aIDs, bRetired) {
  return new Promise(function(resolve, reject) {
    db.collection('artists').updateMany(
      {_id: {$in: aIDs}}, 
      {$set: {'retired': bRetired}}, 
      (err) => { err ? reject(err) : resolve() }
    );
  });
}

function createArtist(oProps, id) {
  const oArtist = assignIn({},
    oProps,
    {
      _id: parseInt(id),
      age: parseInt(oProps.age) || 20,
      yearsActive: parseInt(oProps.yearsActive) || 5
    }
  );
  return oArtist;
}

module.exports = router;