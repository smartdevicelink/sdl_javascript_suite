//serve the bundled file

const http = require('http');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('.'));
app.listen(2222);

console.log("Server running on port 2222");