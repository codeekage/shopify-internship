const db = require('../config/db');
const UserSchema = require('./users');
const AuthLogsSchema = require('./authLogs');
const ImageSchema = require('./images');

const connection = {
  db,
  User: db.model('users', UserSchema),
  AuthLog: db.model('authLogs', AuthLogsSchema),
  Images: db.model('images', ImageSchema),
};

module.exports = connection;
