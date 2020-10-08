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

api
  .use(rootRouter.routes())
  .use(rootRouter.allowedMethods())
  .use(offerRouter.routes())
  .use(offerRouter.allowedMethods())

if (config.has("sentry.dsn")) {
  const Sentry = require("@sentry/node")

  Sentry.init({
    dsn: config.get("sentry.dsn"),
    release: `${config.get("name")}@${config.get("version")}`,
    environment: config.get("environment"),
  })

  api.on("error", (err, ctx) => {
    Sentry.withScope(scope => {
      scope.addEventProcessor(event =>
        Sentry.Handlers.parseRequest(event, ctx.request)
      )
      Sentry.captureException(err)
    })
  })
}

api.start = () => {
  http.createServer(api.callback()).listen(config.get("port"))
}

module.exports = api
