const config = require("config")

exports.index = async ctx => {
  ctx.body = {
    name: config.get("name"),
    version: config.get("version"),
  }
}
