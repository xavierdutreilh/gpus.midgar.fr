const Router = require("koa-router")

const { index } = require("./offer.controller")

const router = new Router({ prefix: "/offers" })

router.get("/", index)

module.exports = router
