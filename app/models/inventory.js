const { Schema, Types } = require('mongoose');
const { ENUMS } = require('../constants');

const InventorySchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  imageId: { type: Types.ObjectId, required: true },
  amount: { type: Number, required: true, default: 0 },
  type: { type: String, enum: ENUMS.INVENTORY_TYPES, required: true },
}, { timestamps: true });

module.exports = InventorySchema;
