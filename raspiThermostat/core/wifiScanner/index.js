var 
  nmap = require('node-nmap'),
  wifiScanner;
 
// nmap.nodenmap.nmapLocation = "nmap"; //default 


wifiScanner = {
  scanNetwork: function scanNetwork() {
    return new Promise(function (resolve, reject) {
      //    Accepts array or comma separated string of NMAP acceptable hosts 
      var quickscan = new nmap.nodenmap.QuickScan('192.168.86.0/24');
       
      quickscan.on('complete', function(data){
        resolve(data);
      });
       
      quickscan.on('error', function(error){
        reject(error);
      });
       
      quickscan.startScan();
    });
  }
};

module.exports = wifiScanner;