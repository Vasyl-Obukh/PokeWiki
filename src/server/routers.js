const router = require('koa-router')(
  {prefix: '/api'}
);


router.get('/', function* (next) {
  const apiRes = [];
  for (let i = 1; i <= 30; i++) {
    apiRes[i-1] = yield this.get(`/pokemon/${i}`, null, {
      'User-Agent': 'koa-http-request'
    });
  }

  this.body = apiRes;
  //this.body = [{a: 1}];
  yield next;
});

module.exports = router;