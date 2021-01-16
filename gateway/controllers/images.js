// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const fs = require('fs');
const path = require('path');
const { INTERNAL_SERVER_ERROR, CREATED } = require('http-status');
const {
  uploadImage, updateImage, readImage, listPublicImages,
  listUserImages,
  renderImage,
} = require('../../app/modules/images');
const ErrorMessage = require('../constants');

const tempStorage = ({ tempLocation, Body }) => new Promise((resolve, reject) => {
  fs.writeFile(`${tempLocation}`, Body, (err) => {
    if (err) reject(err);
    resolve(tempLocation);
  });
});
/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function imageUploadController(req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json(ErrorMessage.GATEWAY_NO_FILES_TO_UPLOAD);
    }
    const imageBuffering = Object.values(req.files);
    const response = [];

    const {
      permission, price, discount, name, metadata,
      description, watermark,
    } = req.query;

    const queryMetadata = metadata.split(',');
    for (let index = 0; index < imageBuffering.length; index += 1) {
      const image = imageBuffering[index];
      // eslint-disable-next-line no-await-in-loop
      const result = await uploadImage({
        userId: req.user._id,
        image,
        permission,
        price,
        discount,
        name,
        metadata: queryMetadata,
        description,
        watermark,
      });
      if (!result.success) {
        return res.status(result.status).json({ ...result, status: undefined });
      }
      response.push(result.data);
    }
    return res.status(CREATED).json({ success: true, data: response });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ErrorMessage.GATEWAY_INTERNAL_SERVER_ERROR,
    });
  }
}

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function imageUpdateController(req, res) {
  try {
    const {
      permission, price, discount, description,
    } = req.body;
    const updateImageResponse = await updateImage({
      discount,
      price,
      permission,
      imageId: req.params.imageId,
      userId: req.user._id,
      description,
    });
    return res.status(updateImageResponse.status).json({
      ...updateImageResponse,
      status: undefined,
    });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error,
    });
  }
}

/**
 * @deprecated Improved logic and don't want to loose
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function imageReadFileController(req, res) {
  try {
    const readImageResponse = await renderImage({
      imageId: req.params.imageId,
      userId: req.user._id,
    });
    if (!readImageResponse.success) {
      return res.status(readImageResponse.status).json({
        ...readImageResponse,
        status: undefined,
      });
    }
    const { Body, imageKey } = readImageResponse.data;
    const tempLocation = path.join(`${__dirname}/tmp/${imageKey}`);
    const location = await tempStorage({ tempLocation, Body });
    setTimeout(() => {
      fs.unlink(tempLocation, (err) => {
        if (err) throw err;
      });
    }, 4500);
    return res.status(200).send(`<img src='${location}'/>`);
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error,
    });
  }
}

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function imageReadController(req, res) {
  try {
    const imageReadBuffer = await readImage({
      imageId: req.params.imageId,
      userId: req.user._id,
    });
    const { success, status, data } = imageReadBuffer;
    data.ETag = undefined;
    data.VersionId = undefined;
    data.imageKey = undefined;
    return res.status(status).json({
      success,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error,
    });
  }
}

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function listPublicImagesController(req, res) {
  try {
    const imageReadBuffer = await listPublicImages();
    const { success, status, data } = imageReadBuffer;
    data.map((e) => {
      e.imageStore = undefined;
      e.userId = undefined;
      return undefined;
    });
    return res.status(status).json({
      success,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error,
    });
  }
}

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function listUserImagesController(req, res) {
  try {
    const imageReadBuffer = await listUserImages({ userId: req.user._id });
    const { success, status, data } = imageReadBuffer;
    data.map((e) => {
      e.imageStore = undefined;
      e.userId = undefined;
      return undefined;
    });
    return res.status(status).json({
      success,
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error,
    });
  }
}

module.exports = {
  imageUploadController,
  imageUpdateController,
  imageReadController,
  imageReadFileController,
  listPublicImagesController,
  listUserImagesController,
};
