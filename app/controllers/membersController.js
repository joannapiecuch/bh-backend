const Member = require('../models/member');
const restifyMongoose = require('restify-mongoose');
const members = restifyMongoose(Member);

module.exports = (server) => {
  server.post('/members', members.insert());
};
