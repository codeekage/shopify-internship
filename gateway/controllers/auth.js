// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const { login } = require('../../app/modules/auth');
const ErrorMessage = require('../constants');

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function loginController(req, res) {
  try {
    const { password, username } = req.body;
    const user = await login({
      password, username, ipAddress: req.ip_address,
    });
    return res.json({ ...user, status: undefined });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ErrorMessage.GATEWAY_INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  loginController,
};
