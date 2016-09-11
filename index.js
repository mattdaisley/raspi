var cron = require('node-cron');

var mattdaisleyApi = require('./mattdaisleyApi');



cron.schedule('*/5 * * * * *', function(){
  
  mattdaisleyApi.getAuthToken()
    .then( function(response) {
      var token = response.token;
      mattdaisleyApi.auth.setToken(response.token);

      return mattdaisleyApi.lifx.toggle();
    })
    .then( function() {
      console.log('toggled');
    })
    .catch (function(error) {
      console.log('in catch');
    });
});