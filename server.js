/* Written by Jonathan Calderon Chavez,
I used code that was provide Jonathon Thompson
*/

const Koa           = require('koa');
const server        = new Koa();
const defaultRouter = require('./routes/default');
const bodyparser    = require('koa-bodyparser');
const koajson       = require('koa-json');

// This is the port that assigned for me, for this class
const API_PORT      = 8209;

server.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time'); 
    console.log(`Type: ${ctx.method} Path: ${ctx.url} Time: ${rt}`)
 });
 
 server.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

server.use(bodyparser());
server.use(koajson());

defaultRouter(server);

// conformation
server.listen(API_PORT, () => {
    console.log(`I'm running on Port: ${API_PORT}`);
});