// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const { uploadImage } = require('../../app/modules/images');
const ErrorMessage = require('../constants');

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function imageUploadController(req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json('No files were uploaded.');
    }
    const imageBuffering = Object.values(req.files);
    const response = [];

    const { permission, price, discount } = req.query;
    for (let index = 0; index < imageBuffering.length; index += 1) {
      const image = imageBuffering[index];
      // eslint-disable-next-line no-await-in-loop
      const result = await uploadImage({
        userId: req.user._id,
        image,
        permission,
        price,
        discount,
      });
      response.push(result);
    }
    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ErrorMessage.GATEWAY_INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  imageUploadController,
};
