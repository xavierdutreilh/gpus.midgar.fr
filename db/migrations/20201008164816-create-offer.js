module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("offers", {
      store: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })
    await queryInterface.addIndex("offers", ["status"])
  },
  down: async queryInterface => {
    await queryInterface.dropTable("offers")
  },
}
