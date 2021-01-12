const { UNAUTHORIZED } = require('http-status');
const jwt = require('jsonwebtoken');
const { failed } = require('../utils/responses');

async function signToken(tokenSignature) {
  try {
    const expiresIn = 24 * 60 * 60;
    const token = jwt.sign(tokenSignature, process.env.JWT_AUTH_SECRET, {
      expiresIn,
      subject: 'user',
    });
    return { token, expiresIn };
  } catch (error) {
    return failed();
  }
}

async function verifyToken(token) {
  try {
    const verified = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    return verified;
  } catch (error) {
    return failed(UNAUTHORIZED, 'You are attempting an invalid credentials');
  }
}

module.exports = {
  signToken,
  verifyToken,
};
