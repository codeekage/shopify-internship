// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const { NOT_FOUND, UNAUTHORIZED } = require('http-status');
const { UNEXPECTED_ERROR_OCCURED } = require('../constants');
const { uploadImageToS3, readImageFromS3 } = require('../helper/images');
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
      name,
      metadata,
      description,
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
    return success({ imageUpdate, message: `Image [${JSON.stringify(query)}] updated` });
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

async function readImage({ imageId }) {
  try {
    const imageData = await Images.findById(imageId).lean();
    if (!imageData) {
      return failed(NOT_FOUND, 'Image does not exists');
    }
    const imageResult = await readImageFromS3({
      imageStore: imageData.imageStore,
    });
    return success(imageResult);
  } catch (error) {
    return failed(null, error);
  }
}

async function listPublicImages() {
  try {
    const imageResult = [];
    const imageData = await Images.find({ permission: 'public' }).lean();
    for (let index = 0; index < imageData.length; index += 1) {
      const imageList = imageData[index];
      // eslint-disable-next-line no-await-in-loop
      const s3Image = await readImageFromS3({ imageStore: imageList.imageStore });
      imageResult.push(s3Image);
    }
    return success(imageResult);
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

async function listUserImages({ userId }) {
  try {
    const imageResult = [];
    const imageData = await Images.find({ userId }).lean();
    for (let index = 0; index < imageData.length; index += 1) {
      const imageList = imageData[index];
      console.info(imageList);
      // eslint-disable-next-line no-await-in-loop
      const s3Image = await readImageFromS3({ imageStore: imageList.imageStore });
      imageResult.push(s3Image);
    }
    return success(imageResult);
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

async function verifyImagePermission({ userId, imageId }) {
  try {
    const imageData = await Images.findById(imageId).lean();
    if (!imageData) {
      return failed(NOT_FOUND, 'Image does not exists');
    }
    const { permission } = imageData;
    if (permission !== 'public') {
      const user = await Images.findOne({ _id: imageId, userId });
      if (!user) {
        return failed(UNAUTHORIZED, 'This image is private and cannot be viewed. You might want to make it public to access it.');
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
};
