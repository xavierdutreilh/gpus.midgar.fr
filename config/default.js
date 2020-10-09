const { name, version } = require("../package")

module.exports = {
  name,
  version,
  port: 3000,
  database: {
    dsn: "postgres://gpus:gpus@database:5432/gpus",
  },
}
