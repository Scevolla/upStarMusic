var express = require('express');
var router = express.Router();

router.get('/api', function(req, res) {
  var aData = req.app.get('aData');
  res.json(aData);
});

module.exports = router;