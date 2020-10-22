module.exports = {
  up: async queryInterface => {
    await queryInterface.sequelize.query(
      "CREATE FUNCTION tsmatch(a TSVECTOR, b TSQUERY) RETURNS BOOLEAN AS $$ BEGIN RETURN a @@ b; END; $$ LANGUAGE plpgsql;"
    )
  },
  down: async queryInterface => {
    await queryInterface.sequelize.query("DROP FUNCTION tsmatch")
  },
}
