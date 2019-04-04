const Koa = require('koa');
const serve = require('koa-static')
const config = require('./webpack.config.js');
const _ = require('koa-route');
const db = require('./src/db')

async function start() {
  const app = new Koa();
  app.use(serve('./dist'))

  app.use(_.get('/trains', async (ctx) => {
    ctx.body = await new Promise(resolve => db(resolve))
  }));

  app.listen(3000)
}

start()
