const controllers = require('./controllers/index');
const router = require('koa-router')(
  {prefix: '/api'}
);

router.get('/pages/:page', controllers.cards.getCards);
router.get('/pokemon/:id', controllers.page.getPage);
router.get('/related', controllers.related.getRelated);

module.exports = router;
