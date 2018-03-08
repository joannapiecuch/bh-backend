const restify = require('restify');
const mongoose = require('mongoose');
const membersController = require('../app/controllers/membersController');

const server = restify.createServer({
  name: 'API',
  version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.listen(3000, () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/BhBackend');
  const db = mongoose.connection;

  db.on('error', err => {
    console.error(err);
  });

  db.once('open', () => {
    membersController(server);
    console.log(`Server is listening on port localhost:3000`);
  });
});

