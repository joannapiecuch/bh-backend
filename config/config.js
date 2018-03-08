module.exports = {
  name: 'API',
  port: process.env.PORT || 3000,
  version: '1.0.0',
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/api',
  },
};
