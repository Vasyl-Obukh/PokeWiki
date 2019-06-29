const router = require('koa-router')(
  {prefix: '/api'}
);

const mocha = [
  {name: 'aaa', id: 1},
  {name: 'bbb', id: 2}
];

router.get('/', function* (next) {
  this.body = mocha;
  yield next;
});

module.exports = router;