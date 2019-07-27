var controllers = require('./controllers');
var Router = require('koa-router')({ prefix: '/indexator' });
Router.get('/healthcheck', controllers.healthcheck.checkHealth);
Router.get('/run', controllers.runIndexation.run);
module.exports = Router;
//# sourceMappingURL=routers.js.map