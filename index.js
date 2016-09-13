var cron = require('node-cron');

var mattdaisleyApi = require('./mattdaisleyApi');

var senseHat = require('./senseHat');

// senseHat.testOutput()
//   .then(function(result) {
//     console.log(result);

//     return senseHat.getTemperature();
//   })
//   .then(function(temp) {
//     console.log(temp);
//   });

var t1 = senseHat.getTemperature();
var t2 = senseHat.getHumidity();
var t3 = senseHat.getPressure();

var sensors = [ t1, t2, t3 ];

Promise.all( sensors )
  .then(results => { 
    var temperature = results[0];
    var humidity = results[1];
    var pressure = results[2];

    console.log(temperature, humidity, pressure);
  }, reason => {
    console.log(reason)
  }
);

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