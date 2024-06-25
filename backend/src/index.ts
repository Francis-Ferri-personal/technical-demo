import Server from "./server/server"
import router  from "./router/router"
import {port} from "./config/config"

const server = Server.init(port);
server.app.use(router)

console.log("Hello world!")