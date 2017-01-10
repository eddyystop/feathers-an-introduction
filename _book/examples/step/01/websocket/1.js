
// Example - Create REST & socketio API, and serve static files

const NeDB = require('nedb');
const path = require('path');
const service = require('feathers-nedb');
/// [websocket]
const rest = require('feathers-rest');
const socketio = require('feathers-socketio'); // new

const expressServerConfig = require('../common/expressServerConfig');
const expressMessage = require('../common/expressMessage');

const app = expressServerConfig()
  .configure(rest())
  .configure(socketio()) // new
  .configure(services)
  .configure(expressMessage);
//! [websocket]

const server = app.listen(3030);
server.on('listening', () => console.log(`Feathers application started on port 3030`));

function services() {
  this.use('/users', service({ Model: userModel() }));
}

function userModel() {
  return new NeDB({
    filename: path.join('examples', 'step', 'data', 'users.db'),
    autoload: true
  });
}
