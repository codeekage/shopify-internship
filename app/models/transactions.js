const { Schema, Types } = require('mongoose');

const TransactionsSchema = new Schema({
  ownerId: { type: Types.ObjectId, required: true },
  buyerId: { type: Types.ObjectId, required: true },
  imageId: { type: Types.ObjectId, required: true },
  paidAmount: { type: Types.ObjectId, required: true, default: 0 },
  metadata: { type: Object, required: true },
  card: { type: Object },
}, { timestamps: true });

module.exports = TransactionsSchema;
