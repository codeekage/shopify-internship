// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const { UNEXPECTED_ERROR_OCCURED } = require('../constants');
const { uploadImageToS3 } = require('../helper/images');
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
}) {
  try {
    const s3Upload = await uploadImageToS3({
      image,
      userId,
    });
    const { Location: imageURL, VersionId: imageVersion, ETag: eTag } = s3Upload;
    const imageCreate = await Images.create({
      userId,
      permission,
      price: price * 100,
      discount,
      imageStore: {
        imageURL,
        imageVersion,
        eTag,
      },
    });
    if (!imageCreate) {
      return failed(null, UNEXPECTED_ERROR_OCCURED);
    }
    imageCreate.userId = undefined;
    return created({ imageCreate });
  } catch (error) {
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
}) {
  try {
    const query = {};
    if (permission) query.permission = permission;
    if (price) query.price = price;
    if (discount) query.discount = discount;
    const imageUpdate = await Images.findOneAndUpdate({ _id: imageId, userId },
      { $set: { query } }, { new: true });

    if (!imageUpdate) {
      return failed(null, UNEXPECTED_ERROR_OCCURED);
    }
    return success({ imageUpdate, message: `Image [${query}] updated` });
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

module.exports = {
  updateImage,
  uploadImage,
};
