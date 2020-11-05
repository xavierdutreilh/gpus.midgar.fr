const Typography = require("typography")
const theme = require("typography-theme-github")

theme.overrideThemeStyles = () => ({
  a: {
    color: "#f5b027",
  },
  body: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    margin: "2.4375rem auto",
    maxWidth: "960px",
  },
  main: {
    margin: "2.4375rem",
  },
  table: {
    margin: "2.4375rem 0",
  },
  "td, th": {
    borderBottom: 0,
  },
})

const typography = new Typography(theme)

module.exports = typography
