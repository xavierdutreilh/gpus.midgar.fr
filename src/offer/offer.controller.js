const Sequelize = require("sequelize")
const { Op } = require("sequelize")

const { Offer } = require("../db")
const { serialize } = require("./offer.serializer")

exports.index = async ctx => {
  const { name, ...where } = ctx.request.query
  if (name) {
    where[Op.and] = [
      Sequelize.fn(
        "tsmatch",
        Sequelize.col("search"),
        Sequelize.fn("plainto_tsquery", "english", name)
      ),
    ]
  }
  const offers = await Offer.findAll({
    where,
    order: [["updatedAt", "DESC"]],
  })
  ctx.body = offers.map(serialize)
}
