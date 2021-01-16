const { Types } = require('mongoose');
const { USER_NOT_FOUND } = require('../constants');
const { User } = require('../models');
const { failed, success } = require('../utils/responses');

/**
 * @param {{ userId: string }} param
 */
async function getUser({ userId }) {
  try {
    const id = Types.ObjectId(userId);
    const user = await User.findOne({ _id: id }).lean();
    if (!user) {
      return failed(null, USER_NOT_FOUND);
    }
    return success(user);
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

module.exports = {
  getUser,
};
