const config = require("config")
const glob = require("glob")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(config.get("database.dsn"), { logging: false })

const db = glob.sync(`${__dirname}/../db/models/*.js`).reduce((db, file) => {
  const model = require(file)(sequelize, Sequelize.DataTypes)
  db[model.name] = model
  return db
}, {})

module.exports = db
