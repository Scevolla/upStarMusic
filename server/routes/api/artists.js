var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var assignIn = require('lodash.assignin');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/api/artists', function(req, res) {
  aData = req.app.get('aData');
  if (req.query.retired) {
    setRetired(aData, req.body, req.query.retired == 'on' ? true : false);
    fs.writeFile('server/database/data.json', JSON.stringify(aData), 'utf8', function(err) {
      if (err) { 
        console.log(err);
      } else {
        res.json('');
      }
    });
  } else {
    var aArtists = searchArtists(req.body, aData); 
    res.json(aArtists);
  }  
});

router.put('/api/artists', function(req, res) {
  var aData = req.app.get('aData');
  var nNextArtistID = req.app.get('nNextArtistID');
  const oArtist = createArtist(req.body, nNextArtistID++);
  aData.push(oArtist);
  fs.writeFile('server/database/data.json', JSON.stringify(aData), 'utf8', function(err) {
    if (err) { 
      console.log(err);
    } else {
      fs.writeFile('server/database/nextArtistID.json', JSON.stringify(nNextArtistID), 'utf8', function(err) {
        if (err) {
          console.log(err);
        } else {
          res.json(oArtist._id);
        }
      });
    }
  });   
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

function setRetired(aData, aIDs, bRetired) {
  aData.filter(a => aIDs.indexOf(a._id) !== -1)
    .forEach(a => a.retired = bRetired);
}

module.exports = router;