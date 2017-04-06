/**
 * Created by wind on 17/4/6.
 */
var os = require('os');

/**
 * 获取本地的IP地址
 * @returns {string}
 */
var getLocalIps = function() {
  let iFaces = os.networkInterfaces();
  let eth1 = iFaces['eth1'] || [];
  let localhostIpAddress = '';
  eth1.forEach(function(item){
    if(item.family === 'IPv4') {
      localhostIpAddress = item.address;
    }
  });
  return localhostIpAddress;
};

module.exports = {
  getLocalIps : getLocalIps
};