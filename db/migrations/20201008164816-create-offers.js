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
      search: {
        type: "TSVECTOR",
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
    await queryInterface.addIndex("offers", ["search"], { using: "gin" })
    await queryInterface.sequelize.query(
      "CREATE TRIGGER offers_search_update BEFORE INSERT OR UPDATE ON offers FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger(search, 'pg_catalog.english', name)"
    )
  },
  down: async queryInterface => {
    await queryInterface.dropTable("offers")
  },
}
