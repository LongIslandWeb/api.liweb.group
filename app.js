var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var fs = require('fs');
var moment = require('moment');
var express = require('express');
var config = require('./config/config');
var root = __dirname;

var index = require('./routes/index');
var events = require('./routes/events');


var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/events/', events);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
function errorHandler (err, req, res, next) {

  console.log(err);
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.send({ error: err })

  return;
}

app.use(errorHandler)

module.exports = app;
