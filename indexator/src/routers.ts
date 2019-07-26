const controllers = require('./controllers');
const router = require('koa-router')(
  {prefix: '/indexator'}
);

router.get('/healthcheck', controllers.healthcheck.checkHealth);
router.get('/run', controllers.run.run);

module.exports = router;
