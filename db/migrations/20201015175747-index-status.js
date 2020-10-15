module.exports = {
  up: async queryInterface => {
    await queryInterface.addIndex("offers", ["status"])
  },
  down: async queryInterface => {
    await queryInterface.removeIndex("offers", ["status"])
  },
}
