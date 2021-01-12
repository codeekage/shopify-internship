// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const { INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('http-status');
const { verifyAuthToken } = require('../../app/modules/auth');
const ErrorMessage = require('../constants');

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function verifyTokenHandler(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(UNAUTHORIZED).json({
        success: false,
        error: 'Unauthorized!',
      });
    }
    const [, authToken] = authorization.split(' ');
    const userData = await verifyAuthToken({ authToken });
    if (!userData.success) {
      return res.status(userData.status).json(userData.error);
    }
    req.user = userData.data;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ErrorMessage.GATEWAY_INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  verifyTokenHandler,
};
