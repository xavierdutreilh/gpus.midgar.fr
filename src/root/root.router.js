const Router = require("koa-joi-router")

const { index } = require("./root.controller")

const router = new Router()

router.route({ method: "get", path: "/", handler: index })

module.exports = router
