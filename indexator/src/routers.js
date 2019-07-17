const router = require('koa-router')(
  {prefix: '/indexator'}
);
const { getTimestamp, init } = require('./utils/indexator');

router.get('/healthcheck', function* () {
  const timestamp = yield getTimestamp();

  this.response.status = timestamp ? 200 : 503;
});

router.get('/run', () => {
  console.log('\n\nrun\n\n');
  init();
});

module.exports = router;
