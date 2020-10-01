const config = require("config")

const { getOffers } = require("./offer.crawler")

exports.index = async ctx => {
  const results = await Promise.all(
    config.get("gpus").map(gpu => getOffers(gpu))
  )
  ctx.body = results.flat()
}
