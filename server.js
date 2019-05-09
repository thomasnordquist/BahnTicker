const Koa = require('koa');
const serve = require('koa-static')
const config = require('./webpack.config.js');
const _ = require('koa-route');
const db = require('./src/db')

let lastResponse
let lastResponseTime = 0
let responsePromise
let responseValidity = 30 * 1000
async function start() {
  const app = new Koa();
  app.use(serve('./dist'))

  app.use(_.get('/trains', async (ctx) => {
    if ((Date.now() - lastResponseTime) > responseValidity) {
      responsePromise = new Promise(resolve => db(resolve))
      lastResponse = await responsePromise
      responsePromise = undefined
      lastResponseTime = Date.now()
    }
    ctx.body = responsePromise ? await responsePromise : lastResponse
  }));

  app.listen(3000)
}

start()
