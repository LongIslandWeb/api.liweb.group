/*
var mongoose = require('mongoose');

module.exports = function(config) {
  mongoose.connect(config.db);
  var db = mongoose.connection;

  db.on('error', function(err) {
    throw new Error('Unable to connect to database at ' + config.db + " " + err);
  });
};
*/