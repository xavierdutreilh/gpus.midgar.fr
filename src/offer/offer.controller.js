const cleanDeep = require("clean-deep")
const config = require("config")
const Pug = require("koa-pug")
const Sequelize = require("sequelize")
const { Op } = require("sequelize")

const { Offer } = require("../db")
const { serialize } = require("./offer.serializer")

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
  const offers = await Offer.findAll({ where, order: [["updatedAt", "DESC"]] })
  switch (ctx.accepts("html", "json")) {
    case "json":
      ctx.body = offers.map(serialize)
      break
    default:
      ctx.body = await pug.render("index", { config, query, offers })
  }
}
