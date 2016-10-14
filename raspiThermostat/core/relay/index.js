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

  on: function on(options) {
    switch(options.relay) {
      case 1:
        this.relay1on();
        break;
      case 2:
        this.relay2on();
        break;
      case 3:
        this.relay3on();
        break;
      case 4:
        this.relay4on();
        break;
    }
  },

  off: function on(options) {
    switch(options.relay) {
      case 1:
        this.relay1off();
        break;
      case 2:
        this.relay2off();
        break;
      case 3:
        this.relay3off();
        break;
      case 4:
        this.relay4off();
        break;
    }
  },

  relay1on: function relay1on(options) {
      return runScript('relay1on.py');
  },

  relay1off: function relay1off(options) {
      return runScript('relay1off.py');
  },

  relay2on: function relay2on(options) {
      return runScript('relay2on.py');
  },

  relay2off: function relay2off(options) {
      return runScript('relay2off.py');
  },

  relay3on: function relay3on(options) {
      return runScript('relay3on.py');
  },

  relay3off: function relay3off(options) {
      return runScript('relay3off.py');
  },

  relay4on: function relay4on(options) {
      return runScript('relay4on.py');
  },

  relay4off: function relay4off(options) {
      return runScript('relay4off.py');
  },

};

module.exports = relay;
