var PythonShell = require('python-shell');

// receive a message in JSON mode 
var shell = new PythonShell('get_temperature.py', { mode: 'json', scriptPath: 'sense'});
shell.on('message', function (message) {
  // handle message (a line of text from stdout, parsed as JSON) 
  console.log(message);
});