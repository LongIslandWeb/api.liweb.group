var express = require('express'), 
    mongoose = require('mongoose'), 
    fs = require('fs'), 
    http = require('http'),
	  config = require('./config/config'), 
    root = __dirname, 
    app = express(), 
    server = null,
  //  passport = require('passport');   
    moment = require('moment');
    

// Configuration
//require('./config/db')(config);



require('./config/express')(app, config);
require('./config/routes')(app, config);
//require('./config/passport');

app.use(errorHandler);



function errorHandler (err, req, res, next) {
  console.log("Entering error handler");
  res.status(500)
  res.render('error', { error: err })
}


module.exports = app;