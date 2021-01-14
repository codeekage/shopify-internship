const { Schema, Types } = require('mongoose');

const InventorySchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  imageId: { type: Types.ObjectId, required: true },
  amount: { type: Number, required: true, default: 0 },
  trasnactionType: { type: String, enum: ['purchased', 'sold'], required: true },
}, { timestamps: true });

module.exports = InventorySchema;
