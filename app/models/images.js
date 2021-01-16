const { Schema, Types } = require('mongoose');
const { ENUMS } = require('../constants');

const { IMAGE_PERMISSIONS } = ENUMS;
const [, PUBLIC] = IMAGE_PERMISSIONS;

const ImageSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    permission: {
      type: String,
      required: true,
      enum: IMAGE_PERMISSIONS,
      default: PUBLIC,
    },
    name: {
      type: String,
      required: true,
    },
    metadata: [String],
    description: { type: String, required: true },
    imageStore: {
      imageURL: { type: String, required: true },
      imageVersion: { type: String, required: true },
      eTag: String,
    },
    cloudinary: {
      type: {
        public_id: String,
        url: String,
        secure_url: String,
        signature: String,
        assest_id: String,
        format: String,
      },
      required: true,
    },
    discountedPrice: Number,
    avalibility: Boolean,
  },
  { timestamps: true },
);

module.exports = ImageSchema;
