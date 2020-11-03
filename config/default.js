const { name, version } = require("../package")

module.exports = {
  name,
  version,
  api: {
    port: 3000,
  },
  crawler: {
    offer: {
      refresh: "* * * * * *",
    },
  },
  database: {
    dsn: "postgres://gpus:gpus@database:5432/gpus",
  },
}
