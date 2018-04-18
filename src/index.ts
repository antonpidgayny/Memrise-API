import * as debug from 'debug';
import * as http from 'http';
import * as normalizePort from 'normalize-port';

import Server from './server';

debug('ts-express:server');

const port = normalizePort(process.env.PORT);
Server.set('port', port);

console.log(`Server working on port ${port}`);

const api_server = http.createServer(Server);
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

function onListening(): void {
  const addr = api_server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}