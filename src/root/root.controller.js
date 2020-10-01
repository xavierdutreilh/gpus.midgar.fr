const { name, version } = require("../../package")

exports.index = async ctx => {
  ctx.body = { name, version }
}
