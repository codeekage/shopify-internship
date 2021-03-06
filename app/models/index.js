const db = require('../config/db');
const UserSchema = require('./users');
const AuthLogsSchema = require('./authLogs');
const ImageSchema = require('./images');
const InventorySchema = require('./inventory');
const TransactionsSchema = require('./transactions');
const PayPalSchema = require('./paypal');

const connection = {
  db,
  User: db.model('users', UserSchema),
  AuthLog: db.model('authLogs', AuthLogsSchema),
  Images: db.model('images', ImageSchema),
  Inventory: db.model('inventory', InventorySchema),
  Transactions: db.model('transaction', TransactionsSchema),
  PayPal: db.model('paypal', PayPalSchema),
};

module.exports = connection;
