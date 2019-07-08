const app = require('koa')();
const router = require('./routers');
const logger = require('koa-logger');
const { PORT } = require('./config');

const Indexing = require('./indexing');

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const indexing = Indexing.instance;
indexing.configure();
indexing.startWithInterval(15);

app.use(logger());
app.use(indexing.interceptor);
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
