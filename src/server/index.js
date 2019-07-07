const app = require('koa')();
const router = require('./routers');
const logger = require('koa-logger');
const { PORT } = require('./config');
const threads = require('worker_threads');
const { Worker } = threads;
global.indexing = true;

const indexingWorker = new Worker(__dirname + '/indexingWorker.js');

indexingWorker.on('exit', () => {
  global.indexing = false;
});


app.use(logger());
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
