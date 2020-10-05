const Koa = require("koa")
const logger = require("koa-logger")

const offerRouter = require("./offer/offer.router")
const rootRouter = require("./root/root.router")

const api = new Koa()

if (process.env.NODE_ENV !== "test") {
  api.use(logger())
}

api
  .use(rootRouter.routes())
  .use(rootRouter.allowedMethods())
  .use(offerRouter.routes())
  .use(offerRouter.allowedMethods())

module.exports = api
