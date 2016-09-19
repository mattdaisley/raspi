var raspiThermostat = require('./raspiThermostat');

raspiThermostat().then( function(app) {
  app.start()
})
.catch( function(err) {
  console.log(err);
})