const controllers = require('./controllers');
const Router = require('koa-router')(
  {prefix: '/api'}
);

Router.get('/pages/:page', controllers.cards.getCards);
Router.get('/pokemon/:id', controllers.page.getPage);
Router.get('/related', controllers.related.getRelated);

module.exports = Router;
