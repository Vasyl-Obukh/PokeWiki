const app = require('koa')();
const router = require('./routers');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const koaRequest = require('koa-http-request');
const { DB_NAME, PORT, API_BASE } = require('./config');

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

app.use(koaRequest({
  dataType: 'json',
  timeout: 3000,
  host: API_BASE
}));

mongoose.connect(`mongodb://localhost/${DB_NAME}`, { useNewUrlParser: true });
app.use(router.routes());
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
