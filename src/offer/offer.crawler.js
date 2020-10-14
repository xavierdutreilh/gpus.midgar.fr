const ldlc = require("./adapters/ldlc.adapter")
const materielnet = require("./adapters/materielnet.adapter")
const nvidia = require("./adapters/nvidia.adapter")
const { Offer } = require("../db")

exports.refresh = async () => {
  for await (const offers of [
    ldlc.getOffers(),
    materielnet.getOffers(),
    nvidia.getOffers(),
  ]) {
    for (const offer of offers) {
      await Offer.upsert(offer, { returning: false })
    }
  }
}
