// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const { listUserInventoryTransactions } = require('../../app/modules/inventory');
const ErrorMessage = require('../constants');

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function listUserInventoryController(req, res) {
  try {
    const inventory = await listUserInventoryTransactions({
      userId: req.user._id,
    });
    return res.json({ ...inventory, status: undefined });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ErrorMessage.GATEWAY_INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  listUserInventoryController,
};
