const { Schema, Types } = require('mongoose');

const AuthLogsSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  lastLoginAt: { type: Date, required: true },
  ipAddress: { type: String, required: true },
  loginAttempts: Number,
}, { timestamps: true });

module.exports = AuthLogsSchema;
