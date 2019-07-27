var app = require('koa')();
var router = require('./routers');
var logger = require('koa-logger');
var PORT = require('./config/config').PORT;
app.use(logger());
app.use(router.routes());
app.listen(PORT, function () { return console.log("Server started on port " + PORT); });
//# sourceMappingURL=index.js.map