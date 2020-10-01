const Router = require("koa-router")

const { index } = require("./root.controller")

const router = new Router()

router.get("/", index)

module.exports = router
