var cron           = require('node-cron'),
    mattdaisleyApi = require('./mattdaisleyApi'),
    senseHat       = require('./senseHat');

function appServer() {
  this.retryCount = 1;
  this.retryTimeout = undefined;
  this.thermostat = undefined;
}

appServer.prototype.start = function() {
  this.pollForAction();
  this.startCron();
};

appServer.prototype.pollForAction = function() {
  var self = this;

  mattdaisleyApi.thermostat.poll()
    .then( response => {
      self.thermostat = response.thermostat[0];
      return senseHat.showMessage({message: self.thermostat.action});
    })
    .then( result => {
      return mattdaisleyApi.thermostat.destroy(self.thermostat.id);
    })
    .then( result => {
      self.retryCount = 1;
      clearInterval(self.retryTimeout);
      self.pollForAction();
    })
    .catch( err => {
      console.log(err, 'retrying in ' + (1000 * self.retryCount));
      console.log(self.retryTimeout);
      if ( !self.retryTimeout ) self.retryTimeout = setInterval(self.pollForAction, (1000 * self.retryCount) );
      if ( retryCount < 60 ) retryCount += 5;
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