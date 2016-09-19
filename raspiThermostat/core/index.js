var appServer = require('./app-server');

function init() {
    var app = null;

    return new Promise(function (resolve) {

      app = new appServer();
      resolve(app);
    });
}

module.exports = init;