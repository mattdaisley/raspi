var cron           = require('node-cron'),
    mattdaisleyApi = require('./mattdaisleyApi'),
    senseHat       = require('./senseHat');

function appServer() {
  this.retryCount = 1;
  this.retryTimeout = undefined;
  this.thermostat = undefined;
}

appServer.prototype.start = function() {
  this.pollForAction(1, undefined);
  this.startCron();
};

appServer.prototype.pollForAction = function(retryCount, retryTimeout) {
  var self = this;
  console.log('polling');

  mattdaisleyApi.thermostat.poll()
    .then( response => {
      self.thermostat = response.thermostat[0];
      return senseHat.showMessage({message: self.thermostat.action});
    })
    .then( result => {
      return mattdaisleyApi.thermostat.destroy(self.thermostat.id);
    })
    .then( result => {
      clearTimeout(retryTimeout);
      self.pollForAction(1, undefined);
    })
    .catch( err => {
      // console.log(err, 'retrying in ' + parseInt(1000 * self.retryCount));
      // console.log(self.retryCount, typeof(self.retryCount));

      if ( retryCount < 60 ) { retryCount = retryCount + 5; }
      if ( !retryTimeout ) retryTimeout = setTimeout( function() {
        self.pollForAction(retryCount, retryTimeout);
      }, (1000 * retryCount ));

    });
};

appServer.prototype.readSensors = function() {

  return new Promise( function(resolve, reject) {
    var temperature, humidity;

    senseHat.getTemperature()
      .then( result => {
        temperature = result;
        return senseHat.getHumidity();
      })
      .then( result => {
        humidity = result;
        resolve({temperature: temperature, humidity: humidity});
      })
      .catch(err => {
        reject(err);
      });
  })
};

appServer.prototype.startCron = function() {
  var self = this;
  cron.schedule('*/10 * * * * *', function(){
    self.readSensors().then( result => {
      console.log(result);
    })
    .catch( err => {
      console.log(err);
    });
  });
};

module.exports = appServer;