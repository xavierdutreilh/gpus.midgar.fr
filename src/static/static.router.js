const Router = require("koa-joi-router")

const { stylesheet } = require("./static.controller")

const router = new Router()

router.prefix("/static")

router.route({ method: "get", path: "/application.css", handler: stylesheet })

module.exports = router
