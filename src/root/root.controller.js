const config = require("config")

exports.index = async ctx => {
  switch (ctx.accepts("html", "json")) {
    case "json":
      ctx.body = {
        name: config.get("name"),
        version: config.get("version"),
        environment: config.get("environment"),
      }
      break
    default:
      ctx.redirect("/offers")
  }
}
