const { Offer } = require("../db")

exports.index = async ctx => {
  ctx.body = await Offer.findAll()
}
