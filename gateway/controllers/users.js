// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const { INTERNAL_SERVER_ERROR } = require('http-status');
const { createUser } = require('../../app/modules/users');
const ErrorMessage = require('../constants');

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function createUserController(req, res) {
  try {
    const { email, password, username } = req.body;
    const user = await createUser({
      email, password, username,
    });
    return res.status(user.status).json({ ...user, status: undefined });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ErrorMessage.GATEWAY_INTERNAL_SERVER_ERROR,
    });
  }
}

/**
 *
 * @param {HttpRequest} req
 * @param {HttpResponse} res
 */
async function getUserProfile(req, res) {
  try {
    return res.status(200).json({ user: { ...req.user, _id: undefined } });
  } catch (error) {
    console.error(error);
    return res.status(INTERNAL_SERVER_ERROR).json({
      success: false,
      error: ErrorMessage.GATEWAY_INTERNAL_SERVER_ERROR,
    });
  }
}

module.exports = {
  createUserController,
  getUserProfile,
};
