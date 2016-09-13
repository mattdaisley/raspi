var 
    PythonShell          = require('python-shell'),
    path                 = require('path'),
    senseHat;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */

var rootDir = path.resolve(__dirname, '../senseHat');

function runScript(scriptName) {
  return new Promise(function (resolve, reject) {
    var options = { 
      mode: 'json', 
      scriptPath: rootDir + '/sense'
    }

    var shell = new PythonShell(scriptName, options, function (err, results) {
      if ( err ) {
        reject(err);
        return;
      }
    });

    shell.on('message', function (message) {
      resolve(message.result);
    });

  });
}

senseHat = {

  getTemperature: function getTemperature(options) {
      return runScript('get_temperature.py');
  },

  getHumidity: function getHumidity(options) {
      return runScript('get_humidity.py');
  },

  getPressure: function getPressure(options) {
      return runScript('get_pressure.py');
  },

  getTemperatureFromHumidity: function getTemperatureFromHumidity(options) {
      return runScript('get_temperature_from_humidity.py');
  },

  getTemperatureFromPressure: function getTemperatureFromPressure(options) {
      return runScript('get_temperature_from_pressure.py');
  },

  testOutput: function testOutput(options) {
      return runScript('test_output.py');
  }

};

module.exports = senseHat;
