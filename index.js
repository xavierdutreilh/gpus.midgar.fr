const config = require("config")
const http = require("http")
const { CronJob } = require("cron")

const api = require("./src/api")
const { refresh } = require("./src/offer/offer.crawler")

http.createServer(api.callback()).listen(config.get("api.port"))

new CronJob(config.get("crawler.offer.refresh"), refresh, null, true)
