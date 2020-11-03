const config = require("config")
const Koa = require("koa")
const logger = require("koa-logger")

const offerRouter = require("./offer/offer.router")
const rootRouter = require("./root/root.router")

const api = new Koa()

if (config.get("environment") !== "test") {
  api.use(logger())
}

api.use(rootRouter.middleware()).use(offerRouter.middleware())

module.exports = api
