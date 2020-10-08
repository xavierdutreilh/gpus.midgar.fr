const { CronJob } = require("cron")

const { refresh } = require("./offer/offer.crawler")

exports.start = () => {
  new CronJob("* * * * * *", refresh, null, true)
}
