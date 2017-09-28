const express    = require('express');
const router     = express.Router();
const bodyParser = require('body-parser');
const assignIn   = require('lodash.assignin');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/api/artists/:id', function(req, res) {
  const db = req.app.get('db');
  const nID = parseInt(req.params.id);
  db.collection('artists').find({_id: nID}).toArray(function(err, aArtists) {
    if (err) {
      console.log(err);
      res.json({err: 'An error occured while searching artist'});
    } else {
      res.json(aArtists[0]);
    }
  });
});

router.delete('/api/artists/:id', function(req, res) {
  const db = req.app.get('db');
  const nID = parseInt(req.params.id);
  db.collection('artists').deleteOne({_id: nID}, function(err) {
    if (err) {
      console.log(err);
      res.json({err: 'An error occured while deleting artist'});
    } else {
      res.json('deleted');
    }
  });
});

router.put('/api/artists/:id', function(req, res) {
  const db = req.app.get('db');
  const nID = parseInt(req.params.id);
  const oNewValues = assignIn({},
    req.body,
    {
      age: parseInt(req.body.age) || 20,
      yearsActive: parseInt(req.body.yearsActive) || 5
    }
  );
  db.collection('artists').updateOne({_id: nID}, oNewValues, function(err) {
    if (err) {
      console.log(err);
      res.json({err: 'An error occured while updating artist'});
    } else {
      res.json('edited');
    }
  });
});

module.exports = router;

