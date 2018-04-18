"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require("debug");
var http = require("http");
var normalizePort = require("normalize-port");
var server_1 = require("./server");
debug('ts-express:server');
var port = normalizePort(process.env.PORT);
server_1.default.set('port', port);
console.log("Server working on port " + port);
var api_server = http.createServer(server_1.default);
api_server.listen(port);
api_server.on('listening', onListening);
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
function onListening() {
    var addr = api_server.address();
    var bind = (typeof addr === 'string') ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
}
//# sourceMappingURL=index.js.map