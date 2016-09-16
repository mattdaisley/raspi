var cron = require('node-cron');

var mattdaisleyApi = require('./mattdaisleyApi');

var senseHat = require('./senseHat');

// var t1 = senseHat.getTemperature();
// var t2 = senseHat.getHumidity();

// var sensors = [ t1, t2 ];

// Promise.all( sensors )
//   .then(results => { 
//     var temperature = results[0];
//     var humidity = results[1];

//     console.log(temperature);
//     console.log(humidity);

//   }, reason => {
//     console.log(reason)
//   }
// );

mattdaisleyApi.thermostat.poll()
  .then( function(response) {
    var action = response.thermostat.action;

    return senseHat.showMessage({message: action});
  })
  .then( function() {
    console.log('message showed');
  })
  .catch (function(error) {
    console.log(error);
  });

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