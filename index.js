var cron = require('node-cron');

var mattdaisleyApi = require('./mattdaisleyApi');

var senseHat = require('./senseHat');

senseHat.testOutput()
  .then(function(result) {
    console.log(result);

    return senseHat.getTemperature();
  })
  .then(function(temp) {
    console.log(temp);
  })

// cron.schedule('*/5 * * * * *', function(){
  
//   mattdaisleyApi.getAuthToken()
//     .then( function(response) {
//       var token = response.token;
//       mattdaisleyApi.auth.setToken(response.token);

//       return mattdaisleyApi.lifx.toggle();
//     })
//     .then( function() {
//       console.log('toggled');
//     })
//     .catch (function(error) {
//       console.log('in catch');
//     });
// });