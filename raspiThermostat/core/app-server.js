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
      self.retryTimeout = 1;
      self.pollForAction();
    })
    .catch( err => {
      console.log(err);
      if ( !self.retryTimeout ) self.retryTimeout = setInterval(self.pollForAction, (1000 * self.retryTimeout) );
      if ( retryCount < 60 ) retryCount += 5;
    });
};

appServer.prototype.readSensors = function() {

  return new Promise( function(resolve, reject) {
    var temp = senseHat.getTemperature();
    var hum = senseHat.getHumidity();

    var sensors = [ temp, hum ];

    Promise.all( sensors )
      .then(results => { 
        resolve({temperature: results[0], humidity: results[1]});
      })
      .catch(err => {
        reject(err);
      });
  })
};

appServer.prototype.startCron = function() {
  var self = this;
  cron.schedule('10 * * * * *', function(){
    self.readSensors().then( result => {
      console.log(result);
    })
    .catch( err => {
      console.log(err);
    });
  });
};

module.exports = appServer;