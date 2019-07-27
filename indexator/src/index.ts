const app = require('koa')();
const router = require('./routers');
const logger = require('koa-logger');
const { PORT } = require('./config/config');
const indexator = require('./utils/indexator');

app.use(logger());
app.use(router.routes());
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

indexator.init();