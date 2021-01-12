// eslint-disable-next-line no-unused-vars
const { request: HttpRequest, response: HttpResponse } = require('express');
const { NOT_FOUND, OK } = require('http-status');
const Constants = require('../constants');

/**
 * @param {HttpRequest} req @param {HttpResponse} res
 */
const WelcomeHandler = (req, res) => res.status(OK).send(Constants.GATEWAY_WELCOME_MESSAGE);

/**
 * @param {HttpRequest} req @param {HttpResponse} res
 */
const PageNotFound = (req, res) => res.status(NOT_FOUND).send(Constants.GATEWAY_PAGE_NOT_FOUND);

/**
 * @param {HttpRequest} req @param {HttpResponse} res
 */
const ClientIPAddress = (req, res, next) => {
  req.ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  next();
};

module.exports = {
  WelcomeHandler,
  PageNotFound,
  ClientIPAddress,
};
