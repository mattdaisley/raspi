var cron           = require('node-cron'),
    mattdaisleyApi = require('./mattdaisleyApi'),
    senseHat       = require('./senseHat');

function appServer() {
  this.retryCount = 1;
  this.thermostat = undefined;
}

appServer.prototype.start = function() {
  this.pollForAction(1);
  this.startCron();
};

appServer.prototype.pollForAction = function() {
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
      self.pollForAction();
    })
    .catch( err => {
      console.log(err, 'retrying');

      setTimeout( function() {
        self.pollForAction();
      }, 1000);

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
  cron.schedule('*/1 * * * *', function(){
    self.readSensors().then( result => {
      console.log(result);
    })
    .catch( err => {
      console.log(err);
    });
  });
};

module.exports = appServer;