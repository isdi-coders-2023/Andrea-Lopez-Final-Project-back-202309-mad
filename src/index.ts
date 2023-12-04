import { createServer } from 'http';
import { app } from './app.js';
import createDebug from 'debug';
import { dbConnect } from './services/db.connect.js';

const PORT = process.env.PORT || 3030;
const debug = createDebug('W7E:index');
const server = createServer(app);
debug('Starting server');

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('Connected to Data Base: ', mongoose.connection.db.databaseName);
  })
  .catch((error) => {
    server.emit('error', error);
  });

server.on('listening', () => {
  debug('Listening on port', PORT);
});

server.on('error', (error) => {
  console.log(`Error ${error.message}`);
});
