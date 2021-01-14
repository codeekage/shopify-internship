const { Schema, Types } = require('mongoose');

const InventorySchema = new Schema({
  ownerId: { type: Types.ObjectId, required: true },
  buyerId: { type: Types.ObjectId, required: true },
  imageId: { type: Types.ObjectId, required: true },
  paidAmount: { type: Types.ObjectId, required: true, default: 0 },
  imageStore: {
    imageURL: { type: String, required: true },
    imageVersion: { type: String, required: true },
    eTag: String,
  },
}, { timestamps: true });

module.exports = InventorySchema;
