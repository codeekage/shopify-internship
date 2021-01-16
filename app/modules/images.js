/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const { NOT_FOUND, UNAUTHORIZED, BAD_REQUEST } = require('http-status');
const {
  UNEXPECTED_ERROR_OCCURED, ERRORS, ENUMS, MONGO_TYPE,
} = require('../constants');
const { monogoDuplicateError, imageUpdateMessage } = require('../constants/responsesbuilder');
const { uploadAndTransformImage, readImageFromS3 } = require('../helper/images');
const { Images } = require('../models');
const { failed, success, created } = require('../utils/responses');

/**
 *
 * @param {{ image: any, userId: mongoose.Types.ObjectId,
  * permission: 'private' | 'public', price: number, discount: number }} param
  */
async function uploadImage({
  userId,
  permission,
  price,
  discount,
  image,
  name,
  metadata,
  description,
  watermark,
}) {
  try {
    const imageExists = await Images.findOne({ userId, name }).lean();
    if (imageExists) {
      return failed(BAD_REQUEST, ERRORS.IMAGE_EXIST);
    }
    const transformedImage = await uploadAndTransformImage({
      image,
      metadata,
      watermark,
      permission,
    });
    const { s3Upload, cloudinary } = transformedImage;
    const {
      public_id,
      url,
      secure_url,
      signature,
      assest_id,
      format,
    } = cloudinary;
    const { Location: imageURL, VersionId: imageVersion, ETag: eTag } = s3Upload;
    const imageCreate = await Images.create({
      userId,
      permission,
      price: price * 100,
      discount,
      name,
      metadata,
      description,
      imageStore: {
        imageURL,
        imageVersion,
        eTag,
      },
      cloudinary: {
        public_id,
        url,
        secure_url,
        signature,
        assest_id,
        format,
      },
    });
    if (!imageCreate) {
      return failed(null, UNEXPECTED_ERROR_OCCURED);
    }
    imageCreate.userId = undefined;
    return created(imageCreate);
  } catch (error) {
    if (error.code === 11000) {
      const [key] = Object.keys(error.keyValue);
      return failed(400, monogoDuplicateError(key, MONGO_TYPE.IMAGE));
    }
    console.error(error);
    console.error(error);
    return failed(null, error);
  }
}

/**
 *
 * @param {{ imageId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId,
 * permission: 'private' | 'public', price: number, discount: number }} param
 */
async function updateImage({
  imageId,
  userId,
  permission,
  price,
  discount,
  name,
  metadata,
}) {
  try {
    const query = {};
    if (permission) query.permission = permission;
    if (price) query.price = price * 100;
    if (discount) query.discount = discount;
    if (name) query.name = name;
    if (metadata) query.metadata = metadata;
    const imageUpdate = await Images.findOneAndUpdate({ _id: imageId, userId },
      { $set: query }, { new: true });

    if (!imageUpdate) {
      return failed(null, UNEXPECTED_ERROR_OCCURED);
    }
    return success({ imageUpdate, message: imageUpdateMessage(query) });
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

async function readImage({ imageId }) {
  try {
    const imageData = await Images.findById(imageId).lean();
    if (!imageData) {
      return failed(NOT_FOUND, ERRORS.IMAGE_NOT_FOUND);
    }
    return success(imageData);
  } catch (error) {
    return failed(null, error);
  }
}

async function renderImage({ imageId }) {
  try {
    const imageData = await Images.findById(imageId).lean();
    if (!imageData) {
      return failed(NOT_FOUND, ERRORS.IMAGE_NOT_FOUND);
    }
    const imageResult = await readImageFromS3({ imageStore: imageData.imageStore });
    return success(imageResult);
  } catch (error) {
    return failed(null, error);
  }
}

async function listPublicImages() {
  try {
    const imageData = await Images.find({ permission: 'public' }).lean();
    if (!imageData) {
      return failed(NOT_FOUND, ERRORS.NOTHING_TO_SEE);
    }
    return success(imageData);
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

async function listUserImages({ userId }) {
  try {
    const imageData = await Images.find({ userId }).lean();
    if (!imageData) {
      return failed(NOT_FOUND, ERRORS.USER_IMAGE_NOT_FOUND);
    }
    return success(imageData);
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

async function verifyImagePermission({ userId, imageId }) {
  try {
    const imageData = await Images.findById(imageId).lean();
    if (!imageData) {
      return failed(NOT_FOUND, ERRORS.IMAGE_NOT_FOUND);
    }
    const { permission } = imageData;
    const [, PUBLIC] = ENUMS.IMAGE_PERMISSIONS;
    if (permission !== PUBLIC) {
      const user = await Images.findOne({ _id: imageId, userId });
      if (!user) {
        return failed(UNAUTHORIZED, ERRORS.PRIVATE_IMAGE);
      }
    }
    return success();
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

module.exports = {
  updateImage,
  uploadImage,
  readImage,
  verifyImagePermission,
  listPublicImages,
  listUserImages,
  renderImage,
};
