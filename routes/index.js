var express = require('express');
var router = express.Router();
var loxone = require('../my-loxone');

router.get('/:device', function(req, res, next) {

  var device =  req.params.device;

  loxone.get(device, function(output){
    if (output.LL.Code == 200) {
      res.send('Device does exists! AND Value = ' + output.LL.value);
    } else {
      res.send('Device does NOT exists!');
    }
  });
});

/* GET device listing. */
router.get('/:device/:action', function(req, res, next) {

  var device =  req.params.device;
  var action =  req.params.action;

  loxone.set(device, action, function(output){
    if (output.LL.Code == 200) {
      res.send('Device does exists!');
    } else {
      res.send('Device does NOT exists!');
    }
  });
});

module.exports = router;
