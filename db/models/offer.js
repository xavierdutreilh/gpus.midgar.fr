const { Model } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {}
  Offer.init(
    {
      store: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
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
      url: {
        type: DataTypes.STRING,
      },
      search: {
        type: "TSVECTOR",
      },
    },
    {
      sequelize,
      modelName: "Offer",
      tableName: "offers",
      underscored: true,
      indexes: [
        {
          fields: ["status"],
        },
        {
          fields: ["search"],
          using: "gin",
        },
      ],
    }
  )
  return Offer
}
