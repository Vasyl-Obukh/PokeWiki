const controllers = require('./controllers');
const Router = require('koa-router')(
  {prefix: '/indexator'}
);

Router.get('/healthcheck', controllers.healthcheck.checkHealth);
Router.get('/run', controllers.run.runIndexation);

module.exports = Router;
