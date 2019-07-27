const controllers = require('./controllers');
const Router = require('koa-router')(
  {prefix: '/indexator'}
);

router.get('/healthcheck', controllers.healthcheck.checkHealth);
router.get('/run', controllers.run.runIndexation);

module.exports = Router;
