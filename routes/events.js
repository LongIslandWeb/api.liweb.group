var express = require('express');
var router = express.Router();
var eventController = require('../server/controllers/eventController');
var cors = require('cors');

var whitelist = ['http://www.liweb.group', 'https://www.liweb.group', 'http://localhost:4000', 'http://localhost:9000'];

var corsOptions = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

router.use(cors(corsOptions));

router.options('*', cors(corsOptions));

 
  //events controller
router.get('/', cors(corsOptions), eventController.findAllMeetupEvents);

router.get('/fullcal', cors(corsOptions), eventController.findAllMeetupEventsFullCal);

router.get('/test-data', cors(corsOptions), eventController.findAllTestData);

module.exports = router