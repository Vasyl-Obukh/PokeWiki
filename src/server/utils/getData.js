const https = require('https');

module.exports = (url, cb = e => e) => {
  return new Promise(function(resolve, reject){
    let req = https.get(url, (res) => {
      let fullData = '';
      res.on('data', (data) => {
        try {
          fullData += data;
        } catch(e) {
          reject(e);
        }
      });
      res.on('end', function () {
        try {
          resolve(cb(JSON.parse(fullData)));
        } catch (e) {
          resolve({result: null});
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};