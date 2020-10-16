module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("offers", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      store: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.addIndex("offers", ["store", "key"], { unique: true })
    await queryInterface.addIndex("offers", ["status"])
  },
  down: async queryInterface => {
    await queryInterface.dropTable("offers")
  },
}
