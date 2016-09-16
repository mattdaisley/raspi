
var 
    request          = require('request'),
    config           = require('../config'),
    auth             = require('../auth'),
    thermostat;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
thermostat = {

    poll: function poll(options) {

        return new Promise(function (resolve, reject) {
            var options = {
                url: config.apiUrl + 'poll/thermostat/pi/1',
                method: 'get'
            };
             
            function callback(err, response, body) {
                if (!err && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    resolve(info);
                } else {
                    console.log(err, config.apiUrl + 'auth/token', response.statusCode);
                    reject('failed');
                }
            }
             
            request(options, callback);
        });
    }

};

module.exports = thermostat;
