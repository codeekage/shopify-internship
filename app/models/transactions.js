const { Schema, Types } = require('mongoose');

const TransactionsSchema = new Schema({
  ownerId: { type: Types.ObjectId, required: true },
  buyerId: { type: Types.ObjectId, required: true },
  imageId: Types.ObjectId,
  paidAmount: { type: Number, required: true, default: 0 },
  metadata: { type: Object, required: true },
  card: { type: Object },
  transactionRef: { type: String, required: true },
}, { timestamps: true });

module.exports = TransactionsSchema;
