var path            = require('path'),
  config            = {};

config.web          = {}

config.apiRoot      = path.resolve(__dirname, '../mattdaisleyApi');

config.apiBaseUri   = '/api/v0.1/';

config.username     = 'mattdaisley@gmail.com';
config.password     = '1234567';

process.env.TZ = 'UTC';

switch ( process.env.NODE_ENV ) {
  // dev overrides for configuration values
  case 'dev':

    config.web.port = 7768;
    config.web.host = '127.0.0.1';

    config.apiUrl = 'http://' + config.web.host + ':' + config.web.port + config.apiBaseUri;

    break;
  default:

    config.web.port = 8000;
    config.web.host = '172.31.25.198';

    config.apiUrl = 'https://www.mattdaisley.com' + config.apiBaseUri;

    break;
}

module.exports = config;