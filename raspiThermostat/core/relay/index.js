var 
    PythonShell          = require('python-shell'),
    path                 = require('path'),
    relay;
    
/**
 * ### Users API Methods
 *
 * **See:** [API Methods](index.js.html#api%20methods)
 */

var rootDir = path.resolve(__dirname, '../relay');

function runScript(scriptName, args) {
  return new Promise(function (resolve, reject) {
    var options = { 
      mode: 'json', 
      scriptPath: rootDir + '/scripts',
      args: args
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

    shell.end(function (err) {
      if ( err ) {
        throw err;
      }
    });

  });
}

relay = {

  p2on: function p2on(options) {
      return runScript('p2on.py');
  },

  p2off: function p2off(options) {
      return runScript('p2off.py');
  }

};

module.exports = relay;
