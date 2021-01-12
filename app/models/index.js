const db = require('../config/db');
const UserSchema = require('./users');

const connection = {
  db,
  User: db.model('users', UserSchema),
};

module.exports = connection;
