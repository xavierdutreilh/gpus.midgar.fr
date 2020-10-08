const { name, version } = require("../package")

module.exports = {
  name,
  version,
  database: {
    dsn: "postgres://gpus:gpus@database:5432/gpus",
  },
  port: 3000,
}
