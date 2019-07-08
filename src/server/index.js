const app = require('koa')();
const router = require('./routers');
const logger = require('koa-logger');
const { PORT } = require('./config/config');
const indexator = require('./utils/indexator');

indexator.startWithInterval(15);
app.use(logger());
app.use(indexator.interceptor);
app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = err.status || 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

app.use(router.routes());
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
