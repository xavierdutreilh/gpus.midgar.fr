const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {}
  Offer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      store: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Offer",
      tableName: "offers",
      underscored: true,
      indexes: [
        {
          fields: ["store", "key"],
          unique: true,
        },
      ],
    }
  )
  return Offer
}