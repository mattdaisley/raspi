
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
                if (!err && response) {
                    if ( response.statusCode == 200) {
                        var info = JSON.parse(body);
                        resolve(info);
                        return;
                    }
                    console.log(options.url, response);
                    return;
                }
                console.log(err, options.url, response);
                reject('failed');
            }
             
            request(options, callback);
        });
    },


    destroy: function destroy(id) {

        return new Promise(function (resolve, reject) {
            var options = {
                url: config.apiUrl + 'thermostat/' + id,
                method: 'delete'
            };
             
            function callback(err, response) {
                if (!err && response) {
                    if ( response.statusCode == 204) {
                        resolve();
                        return;
                    }
                    console.log(options.url, response);
                    return;
                }
                console.log(err, options.url, response);
                reject('failed');
            }
             
            request(options, callback);
        });
    }

};

module.exports = thermostat;
