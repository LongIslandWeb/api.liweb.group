var defaultController = require('../server/controllers/defaultController');
var eventController = require('../server/controllers/eventController');
var config = require('../env.config.json');
var cors = require('cors');

module.exports = function(app, config) {

/*  var jwt = require('express-jwt');
  
  var auth = jwt({
    secret: config.password_hash,
    userProperty: 'payload'
  });*/

var whitelist = config.cors;

var corsOptions = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));

  
  //default controller
  app.get('/', cors(corsOptions), defaultController.index);
  
  //events controller
  app.get('/events/liweb', cors(corsOptions), eventController.findAllLIWeb);
  
  app.get('/events/test', cors(corsOptions), eventController.findAllTests);

  app.get('/events/fullcal', cors(corsOptions), eventController.fullCalendar);
};