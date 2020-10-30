const config = require("config")
const http = require("http")
const Koa = require("koa")
const logger = require("koa-logger")
const stripAnsi = require("strip-ansi")

const offerRouter = require("./offer/offer.router")
const rootRouter = require("./root/root.router")

const api = new Koa()

if (config.get("environment") !== "test") {
  api.use(
    logger(str => {
      console.log(stripAnsi(str))
    })
  )
}

api.use(rootRouter.middleware()).use(offerRouter.middleware())

api.start = () => {
  http.createServer(api.callback()).listen(config.get("port"))
}

module.exports = api
