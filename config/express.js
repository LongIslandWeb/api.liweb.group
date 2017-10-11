var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');

module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.set('port', config.port);
    app.use(express.logger('dev'));
    //app.use(express.bodyParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(express.methodOverride());
    app.use(passport.initialize());
    app.use('/', app.router);
    //app.use('/', express.static(__dirname + "/../client"));


    // error handlers
    // Catch unauthorised errors
    app.use(function (err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
      }
    });
    
  });
};

