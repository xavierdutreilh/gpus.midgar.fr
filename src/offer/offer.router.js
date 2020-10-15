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
      store: Joi.string(),
    }),
  },
  handler: index,
})

module.exports = router
