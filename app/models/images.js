const { Schema, Types } = require('mongoose');
const { ENUMS } = require('../constants');

const { IMAGE_PERMISSIONS } = ENUMS;
const [, PUBLIC] = IMAGE_PERMISSIONS;

const ImageSchema = new Schema({
  userId: { type: Types.ObjectId, required: true },
  price: { type: Number, required: true, default: 0 },
  discount: { type: Number, required: true, default: 0 },
  permission: {
    type: String, required: true, enum: IMAGE_PERMISSIONS, default: PUBLIC,
  },
  imageStore: {
    imageURL: { type: String, required: true },
    imageVersion: { type: String, required: true },
    eTag: String,
  },
  discountedPrice: Number,
  avalibility: Boolean,
}, { timestamps: true });

module.exports = ImageSchema;