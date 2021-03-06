var cron           = require('node-cron'),
    mattdaisleyApi = require('./mattdaisleyApi'),
    senseHat       = require('./senseHat'),
    relay          = require('./relay');

function appServer() {
  this.retryCount = 1;
  this.thermostat = undefined;
  
  // call the first chunk of code right away
  this.allRelaysOn();
  console.log('in appserver');

  // call the rest of the code and have it execute after 3 seconds
  setTimeout(this.allRelaysOff, 1000);
}

appServer.prototype.start = function() {

  this.pollForAction();
  // this.startCron();
};

appServer.prototype.allRelaysOn = function() {
  relay.relay1on();
  relay.relay2on();
  relay.relay3on();
  relay.relay4on();
};

appServer.prototype.allRelaysOff = function() {
  relay.relay1off();
  relay.relay2off();
  relay.relay3off();
  relay.relay4off();
};

appServer.prototype.pollForAction = function() {
  var self = this;

  mattdaisleyApi.thermostat.poll()
    .then( response => {
      self.thermostat = response.thermostat[0];
      if ( self.thermostat.action == 'on' ) {
        relay.on({'relay': parseInt(self.thermostat.relay)});
      } else {
        relay.off({'relay': parseInt(self.thermostat.relay)});
      }
      // return senseHat.showMessage({message: self.thermostat.action});
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
      mattdaisleyApi.thermostat.addSensorData(result);
    })
    .catch( err => {
      console.log(err);
    });
  });
};

module.exports = appServer;