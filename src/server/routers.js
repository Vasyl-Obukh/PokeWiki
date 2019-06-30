const https = require('https');
const { API_BASE } = require('./config');
const router = require('koa-router')(
  {prefix: '/api'}
);

const getData = (url) => {
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
        resolve(JSON.parse(fullData ));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
    req.end();
  });
};

router.get('/', function* () {
  const promises = [];
  for (let i = 1; i <= 18; i++) {
    let url = API_BASE + '/pokemon/' + i;
    promises[i - 1] = getData(url);
  }
  const apiRes = yield Promise.all(promises);

  this.body = apiRes;
});

module.exports = router;
