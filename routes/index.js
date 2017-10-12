var express = require('express');
var router = express.Router();
var defaultController = require('../server/controllers/defaultController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({message: "Welcome to the LI Web Group API"});
});

router.get('/', defaultController.index);


module.exports = router;





