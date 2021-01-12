const { UNAUTHORIZED } = require('http-status');
const { User } = require('../models');
const { failed, success } = require('../utils/responses');
const { INVALID_LOGIN } = require('../constants');
const { addToBlockList, isBlocked } = require('../helper/redis');
const { signToken } = require('../helper/auth');
const { encrypt } = require('../utils/crypto');

async function login({ username, password, ipAddress }) {
  try {
    const isIpBlocked = await isBlocked({ blockKey: ipAddress });
    if (isIpBlocked.status === 'true') {
      return failed(UNAUTHORIZED, isIpBlocked.message);
    }
    const user = await User.findOne({ username }).select('+password');
    if (!user || !user.comparePassword(password)) {
      await addToBlockList({
        block: ipAddress,
        retryCount: 5,
        expiresIn: 1, // in mins
      });
      return failed(UNAUTHORIZED, INVALID_LOGIN);
    }
    const { _doc: result } = user;
    result.password = undefined;
    const signature = encrypt(`${result._id}`);
    const token = await signToken({ signature });
    return success({ ...result, ...token });
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  login,
};
