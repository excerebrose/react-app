const Mongoose = require('mongoose');
const config = require('../config/db');

Mongoose.connect(config.url);
const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', () => {
  console.log('Connection with database established.');
});

exports.db = db;
