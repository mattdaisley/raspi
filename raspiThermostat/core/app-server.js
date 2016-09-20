var cron           = require('node-cron'),
    mattdaisleyApi = require('./mattdaisleyApi'),
    senseHat       = require('./senseHat')
    wifiScanner    = require('./wifiScanner');

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
  cron.schedule('*/5 * * * *', function(){
    self.readSensors().then( result => {
      // mattdaisleyApi.thermostat.addSensorData(result);
    })
    .catch( err => {
      console.log(err);
    });
  });

  cron.schedule('*/30 * * * * *', function(){
    wifiScanner.scanNetwork()
      .then( result => {
        mattdaisleyApi.wifihosts.addHosts(result);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = appServer;