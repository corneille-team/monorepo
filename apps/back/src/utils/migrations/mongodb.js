/* eslint-disable */
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_ADDON_URI ||
    'mongodb://root:password@localhost:27017/local-api?authSource=admin';

async function connect() {
  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

function getConnect() {
  return mongoose.connection;
}

async function disconnect() {
  await mongoose.disconnect();
}

module.exports = {
  connect,
  getConnect,
  disconnect,
};
