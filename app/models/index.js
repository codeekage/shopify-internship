const db = require('../config/db');
const UserSchema = require('./users');
const AuthLogsSchema = require('./authLogs');

const connection = {
  db,
  User: db.model('users', UserSchema),
  AuthLog: db.model('authLogs', AuthLogsSchema),
};

module.exports = connection;
