// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const { purchaseImage, processImagePurchase } = require('../../app/modules/transactions');
const ErrorMessage = require('../constants');

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function purchaseImageController(req, res) {
  try {
    const purchase = await purchaseImage({
      userId: req.user._id,
      imageId: req.params.imageId,
      amount: Number(req.body.amount * 100),
    });
    return res.json({ ...purchase, status: undefined });
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
async function processImagePurchaseController(req, res) {
  try {
    const purchase = await processImagePurchase({
      paymentId: req.body.paymentId,
      payerId: req.body.payerId,
      userId: req.user._id,
    });
    return res.json({ ...purchase, status: undefined });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ErrorMessage.GATEWAY_INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  purchaseImageController,
  processImagePurchaseController,
};
