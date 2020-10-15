module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("offers", "url", Sequelize.STRING)
  },

  down: async queryInterface => {
    await queryInterface.removeColumn("offers", "url")
  },
}
