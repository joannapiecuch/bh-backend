const restify = require('restify');
const mongoose = require('mongoose');
const membersController = require('../app/controllers/membersController');
const config = require('./config');

const server = restify.createServer({
  name: config.name,
  version: config.version
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(config.port, () => {
  mongoose.Promise = global.Promise;
  mongoose.connect(config.db.uri);
  const db = mongoose.connection;

  db.on('error', err => {
    console.error(err);
  });

  db.once('open', () => {
    membersController(server);
    console.log(`Server is listening on port ${config.port}`);
  });
});
