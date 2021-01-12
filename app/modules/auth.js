const { UNAUTHORIZED, BAD_REQUEST } = require('http-status');
const { Types } = require('mongoose');
const { User } = require('../models');
const { failed, success } = require('../utils/responses');
const { INVALID_LOGIN, USER_NOT_FOUND, ENV } = require('../constants');
const { addToBlockList, isBlocked, getRetryCount } = require('../helper/redis');
const { signToken, verifyToken } = require('../helper/auth');
const { encrypt, decrypt } = require('../utils/crypto');

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
        retryCount: ENV.RETRY_COUNT,
        expiresIn: ENV.BLOCK_EXPIRY_TIME, // in mins
      });
      const retryLeft = await getRetryCount({ blockKey: ipAddress });
      return failed(UNAUTHORIZED, `${INVALID_LOGIN}. You have ${!retryLeft ? 0 : retryLeft} retries left before getting blocked`);
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

async function verifyAuthToken({ authToken }) {
  try {
    const verifyUser = await verifyToken(authToken);
    if (!verifyUser.success) {
      return failed(UNAUTHORIZED, verifyUser);
    }
    const { token } = verifyUser;
    const decryptToken = decrypt(token.signature);
    const userId = Types.ObjectId(decryptToken);
    const userData = await User.findOne({ _id: userId }).lean();

    if (!userData) {
      return failed(BAD_REQUEST, USER_NOT_FOUND);
    }

    userData._id = undefined;
    return success(userData);
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

module.exports = {
  login,
  verifyAuthToken,
};
