
var 
    request          = require('request'),
    config           = require('../config'),
    auth             = require('../auth'),
    wifihosts;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */
wifihosts = {

    addHosts: function addHosts(object) {

        return new Promise(function (resolve, reject) {
            var hosts = [];
            for(var index in object) { 
               if (object.hasOwnProperty(index)) {
                   hosts[index] = { ip: object[index].ip, hostname: object[index].hostname };
               }
            }
            var options = {
                url: config.apiUrl + '/wifihosts',
                method: 'put',
                header: {
                    'content-type' : 'application/x-www-form-urlencoded'
                },
                form: {
                    "hosts": hosts
                }
            };
             
            function callback(err, response, body) {
                if (!err && response) {
                    if ( response.statusCode == 200) {
                        var info = JSON.parse(body);
                        resolve(info);
                        return;
                    }
                }
                reject('failed');
            }
            request(options, callback);
        });
    }

};

module.exports = wifihosts;
