var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var assignIn = require('lodash.assignin');

router.get('/api/artists/:id', function(req, res) {
  const aData = req.app.get('aData');
  const id = parseInt(req.params.id);
  const oArtist = aData.find(a => a._id === id);
  res.json(oArtist);
});

router.delete('/api/artists/:id', function(req, res) {
  const aData = req.app.get('aData');
  const id = parseInt(req.params.id);
  aData.forEach((oArtist, index) => {
    if(oArtist && oArtist._id == id) {
      aData.splice(index, 1);
    }
  });
  fs.writeFile('server/database/data.json', JSON.stringify(aData), 'utf8', function(err) {
    if (err) { 
      console.log(err);
    }
    else {
      res.json('deleted');
    }
  });
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.put('/api/artists/:id', function(req, res) {
  const aData = req.app.get('aData');
  const id = parseInt(req.params.id);
  const oArtist = aData.find(a => a._id == id);
  assignIn(oArtist, req.body);
  fs.writeFile('server/database/data.json', JSON.stringify(aData), 'utf8', function(err) {
    if (err) { 
      console.log(err);
    }
    else {
      res.json('edited');
    }
  });
});

module.exports = router;

