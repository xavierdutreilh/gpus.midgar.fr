const Router = require("koa-joi-router")

const { stylesheet } = require("./asset.controller")

const router = new Router()

router.prefix("/assets")

router.route({ method: "get", path: "/application.css", handler: stylesheet })

module.exports = router
