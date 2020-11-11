const Typography = require("typography")
const theme = require("typography-theme-github")

theme.overrideThemeStyles = () => ({
  body: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    margin: "2.4375rem auto",
    maxWidth: "960px",
  },
  main: {
    margin: "2.4375rem",
  },
  form: {
    alignContent: "center",
    display: "flex",
    margin: "2.4375rem 0",
  },
  input: {
    backgroundColor: "#080808",
    border: 0,
    borderRadius: "0.5rem",
    color: "#fff",
    margin: "0 auto",
    maxWidth: "480px",
    padding: "1rem",
    width: "100%",
  },
  table: {
    margin: "2.4375rem 0",
  },
  "td, th": {
    borderBottom: 0,
  },
  a: {
    color: "#f5b027",
  },
})

const typography = new Typography(theme)

exports.stylesheet = async ctx => {
  ctx.type = "css"
  ctx.body = typography.toString()
}
