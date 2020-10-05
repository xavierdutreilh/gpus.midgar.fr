const config = require("config")
const http = require("http")

const api = require("./src/api")

http.createServer(api.callback()).listen(config.get("port"))
