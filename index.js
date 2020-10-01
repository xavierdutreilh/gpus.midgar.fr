const config = require("config")
const http = require("http")

const api = require("./src")

http.createServer(api.callback()).listen(config.get("port"))
