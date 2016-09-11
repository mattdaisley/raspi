
var 
    request          = require('request'),
    config           = require('./config'),
    auth             = require('./auth'),
    lifx             = require('./lifx'),
    api;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
api = {

    getAuthToken: function getAuthToken(options) {

        return new Promise(function (resolve, reject) {
            var options = {
                url: config.apiUrl + 'auth/token/',
                method: 'put',
                headers: { 
                    'content-type' : 'application/x-www-form-urlencoded'
                },
                form: {
                    "email": config.username,
                    "password": config.password
                }
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

api.auth = auth;
api.lifx = lifx;

module.exports = api;
