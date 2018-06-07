"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var http = require("http");
var normalizePort = require("normalize-port");
var dotenv = require("dotenv");
dotenv.config();
var server_1 = require("./server");
debug('ts-express:server');
var port = normalizePort(process.env.PORT);
//console.log(process.env.jwt_api_key_hash);
server_1.default.set('port', port);
console.log("Server working on port " + port);
var api_server = http.createServer(server_1.default);
api_server.listen(port);
api_server.on('listening', onListening);
//let currentApp = Server;
//server.on('error', onError);
/*function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') { throw error; }
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}*/
/*if (module.hot) {
 module.hot.accept('./server', () => {
  console.log('here');
  api_server.removeListener('request', currentApp)
  api_server.on('request', Server)
  currentApp = Server
 })
}*/
function onListening() {
    var addr = api_server.address();
    var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
//# sourceMappingURL=index.js.map