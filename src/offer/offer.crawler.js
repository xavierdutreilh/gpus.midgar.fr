const ldlc = require("./adapters/ldlc.adapter")
const nvidia = require("./adapters/nvidia.adapter")
const { Offer } = require("../db")

exports.refresh = async () => {
  for await (const offers of [ldlc.getOffers(), nvidia.getOffers()]) {
    for (const offer of offers) {
      await Offer.upsert(offer, { returning: false })
    }
  }
}
