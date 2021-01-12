const { Types } = require('mongoose');
const { User } = require('../models');
const { created, failed, success } = require('../utils/responses');

/**
 * @param {{ email: string, password: string, username: string }} param
 */
async function createUser({ email, password, username }) {
  try {
    const newUser = new User();

    newUser.email = email;
    newUser.password = password;
    newUser.username = username;

    await newUser.save();

    newUser.password = undefined;

    return created(newUser);
  } catch (error) {
    if (error.code === 11000) {
      const [key] = Object.keys(error.keyValue);
      return failed(400, `A user with this ${key} already exists.`);
    }
    console.error(error);
    return failed(null, error);
  }
}

/**
 * @param {{ userId: string }} param
 */
async function getUser({ userId }) {
  try {
    const id = Types.ObjectId(userId);
    const user = await User.findOne({ _id: id }).lean();
    if (!user) {
      return failed(null, 'user not found!');
    }
    return success(user);
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

module.exports = {
  createUser,
  getUser,
};
