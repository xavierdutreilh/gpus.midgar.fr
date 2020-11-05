const cleanDeep = require("clean-deep")
const Pug = require("koa-pug")
const Sequelize = require("sequelize")
const { Op } = require("sequelize")

const { Offer } = require("../db")

const pug = new Pug({ viewPath: `${__dirname}/views` })

exports.index = async ctx => {
  const query = cleanDeep(ctx.request.query)
  const { name, ...where } = query
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
    attributes: ["store", "name", "price", "status", "url"],
    where,
    order: [["updatedAt", "DESC"]],
  })
  switch (ctx.accepts("html", "json")) {
    case "json":
      ctx.body = offers
      break
    default:
      ctx.body = await pug.render("index", { query, offers, require })
  }
}
