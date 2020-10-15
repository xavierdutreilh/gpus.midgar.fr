const { Offer } = require("../db")

exports.index = async ctx => {
  ctx.body = await Offer.findAll({
    where: ctx.request.query,
    order: [["updatedAt", "DESC"]],
  })
}
