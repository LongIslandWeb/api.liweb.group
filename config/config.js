var env = process.env.NODE_ENV || 'development';
var env_config = require('../env.config.json');

var config = {
  port: 3000,
  //db: 'mongodb://localhost/liweb',
  //host: env_config.host || 'localhost',
  //password_hash: env_config.password_hash || 'password'
};

/*
if (env === "bluwemix") {
  var conf = JSON.parse(process.env.VCAP_SERVICES);
  config.db = conf["mongodb-2.2"][0].credentials.url;
  config.port = process.env.VCAP_APP_PORT || 3000;
  config.host = process.env.VCAP_APP_HOST || 'localhost';
}*/

module.exports = config;
