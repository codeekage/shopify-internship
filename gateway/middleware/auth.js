// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const { INTERNAL_SERVER_ERROR, UNAUTHORIZED } = require('http-status');
const { verifyToken } = require('../../app/helper/auth');
const { getUser } = require('../../app/modules/users');
const { decrypt } = require('../../app/utils/crypto');
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
    const verifyUser = await verifyToken(authToken);
    if (!verifyUser.success) {
      return res.status(UNAUTHORIZED).json({ ...verifyUser, status: undefined });
    }
    const { token } = verifyUser;
    const decryptToken = decrypt(token.signature);
    const userId = decryptToken;
    const userData = await getUser({ userId });
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
