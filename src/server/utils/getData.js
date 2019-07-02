const https = require('https');

module.exports = (url, cb = e => e) => {
  return new Promise(function(resolve, reject){
    let req = https.get(url, (res) => {
      let fullData = '';
      res.on('data', (data) => {
        try{
          fullData += data;
        } catch(ex) {
          reject(ex);
        }
      });
      res.on('end', function () {
        resolve(cb(JSON.parse(fullData)));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};