const Sequelize = require("sequelize")
const { Op } = require("sequelize")

const { Offer } = require("../db")

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
  ctx.body = await Offer.findAll({
    where,
    order: [["updatedAt", "DESC"]],
  })
}
