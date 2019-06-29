const app = require('koa')();
const router = require('./routers');

const PORT = 8000;

app.use(router.routes());

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
