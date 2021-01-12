const { UNAUTHORIZED } = require('http-status');
const { User } = require('../models');
const { failed, success } = require('../utils/responses');
const { INVALID_LOGIN } = require('../constants/responses');

async function login({ username, password, ipAddress }) {
  try {
    const user = await User.findOne({ username }).select('+password');
    if (!user || !user.comparePassword(password)) {
      return failed(UNAUTHORIZED, INVALID_LOGIN);
    }
    const { _doc: result } = user;
    result.password = undefined;
    return success({ ...result, ipAddress });
  } catch (error) {
    console.error('ll');
    return error;
  }
}

module.exports = {
  login,
};
