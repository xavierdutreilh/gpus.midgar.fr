const adapters = require("./adapters")

exports.getOffers = async gpu => {
  const results = await Promise.all(
    Object.values(adapters).map(adapter => adapter.getOffers(gpu))
  )
  return results.flat()
}
