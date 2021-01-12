const { UNAUTHORIZED } = require('http-status');
const jwt = require('jsonwebtoken');
const { INVALID_CREDENTIALS } = require('../constants');
const { failed } = require('../utils/responses');

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

async function verifyToken(token) {
  try {
    const verified = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    return { success: true, token: verified };
  } catch (error) {
    return failed(UNAUTHORIZED, INVALID_CREDENTIALS);
  }
}

module.exports = {
  signToken,
  verifyToken,
};
