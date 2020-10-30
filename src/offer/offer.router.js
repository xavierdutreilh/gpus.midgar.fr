const Router = require("koa-joi-router")
const { Joi } = require("koa-joi-router")

const { index } = require("./offer.controller")

const router = new Router()

router.prefix("/offers")

router.route({
  method: "get",
  path: "/",
  validate: {
    query: Joi.object().keys({
      store: Joi.string().empty(""),
      name: Joi.string().empty(""),
      status: Joi.string().empty(""),
    }),
  },
  handler: index,
})

module.exports = router
