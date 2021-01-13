const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require('http-status');
const jwt = require('jsonwebtoken');
const { AuthLog } = require('../models');
const { INVALID_CREDENTIALS, UNEXPECTED_ERROR_OCCURED } = require('../constants');
const { failed, created } = require('../utils/responses');

/**
 * @description signs a new token
 * @param { { signature: {iv: string, content: string } } | string} tokenSignature
 */
async function signToken(tokenSignature) {
  try {
    const expiresIn = 24 * 60 * 60;
    const token = jwt.sign(tokenSignature, process.env.JWT_AUTH_SECRET, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    return failed();
  }
}

/**
 * verify  jwt token is valid
 * @param {string} token
 */
async function verifyToken(token) {
  try {
    const verified = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    return { success: true, token: verified };
  } catch (error) {
    return failed(UNAUTHORIZED, INVALID_CREDENTIALS);
  }
}

/**
 * @description logs logins
 * @param {{ userId: mongoose.Types.ObjectId, ipAddress: string }} param0
 */
async function logLogins({ userId, ipAddress }) {
  try {
    const authLog = await AuthLog.create({ userId, ipAddress });
    if (!authLog) {
      console.error(authLog);
      return failed(null, UNEXPECTED_ERROR_OCCURED);
    }
    return created();
  } catch (error) {
    console.error(error);
    return failed(INTERNAL_SERVER_ERROR, error);
  }
}

module.exports = {
  signToken,
  verifyToken,
  logLogins,
};
