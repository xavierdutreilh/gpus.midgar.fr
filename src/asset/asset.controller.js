const Typography = require("typography")
const theme = require("typography-theme-github")

theme.overrideThemeStyles = () => ({
  html: {
    height: "100%",
  },
  body: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    height: "100%",
    margin: "0 auto",
    maxWidth: "960px",
    overflowX: "auto",
  },
  main: {
    minWidth: "960px",
    padding: "2.4375rem",
  },
  form: {
    backgroundColor: "#080808",
    borderRadius: "0.5rem",
    display: "flex",
    margin: "0 auto 2.4375rem",
    maxWidth: "640px",
    width: "100%",
  },
  input: {
    backgroundColor: "transparent",
    border: 0,
    color: "#fff",
    flex: 1,
    padding: "1rem",
  },
  select: {
    appearance: "none",
    backgroundColor: "transparent",
    border: 0,
    color: "#fff",
    padding: "1rem",
  },
  option: {
    backgroundColor: "#080808",
  },
  button: {
    backgroundColor: "transparent",
    border: 0,
    color: "#fff",
    padding: "1rem",
  },
  table: {
    margin: "2.4375rem 0 0",
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
