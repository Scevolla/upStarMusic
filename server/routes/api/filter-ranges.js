var express = require('express');
var router = express.Router();
var utils = rootRequire('../helpers/utils.js');

router.get('/api/filter-ranges', function(req, res) {
  var aData = req.app.get('aData');
  res.json(getFilterRanges(aData));
});

function getFilterRanges(aData) {
  return {
    limitAge: {
      max: utils.maxPropOfArray(aData, 'age'),
      min: utils.minPropOfArray(aData, 'age'),
    },
    limitYearsActive: {
      max: utils.maxPropOfArray(aData, 'yearsActive'),
      min: utils.minPropOfArray(aData, 'yearsActive'),
    }
  };
}

module.exports = router;