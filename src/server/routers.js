const https = require('https');
const router = require('koa-router')(
  {prefix: '/api'}
);

const getPokemon = (id) => {
  return new Promise(function(resolve, reject){

    let req = https.get('https://pokeapi.co/api/v2/pokemon/' + id, (res) => {
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
  const promises = []
  for (let i = 1; i <= 30; i++) {
    promises[i - 1] = getPokemon(i);
  }
  const apiRes = yield Promise.all(promises);

  this.body = apiRes;
});

module.exports = router;
