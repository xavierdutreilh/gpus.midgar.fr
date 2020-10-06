const config = require("config")
const Koa = require("koa")
const logger = require("koa-logger")
const Sentry = require("@sentry/node")
const stripAnsi = require("strip-ansi")

const offerRouter = require("./offer/offer.router")
const rootRouter = require("./root/root.router")

const api = new Koa()

if (process.env.NODE_ENV !== "test") {
  api.use(
    logger(str => {
      console.log(stripAnsi(str))
    })
  )
}

api
  .use(rootRouter.routes())
  .use(rootRouter.allowedMethods())
  .use(offerRouter.routes())
  .use(offerRouter.allowedMethods())

if (config.has("sentry.dsn")) {
  Sentry.init({
    dsn: config.get("sentry.dsn"),
    environment: process.env.NODE_ENV,
  })

  api.on("error", (err, ctx) => {
    Sentry.withScope(scope => {
      scope.addEventProcessor(event => {
        return Sentry.Handlers.parseRequest(event, ctx.request)
      })
      Sentry.captureException(err)
    })
  })
}

module.exports = api
