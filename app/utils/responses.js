const httpStatus = require('http-status');
const Constants = require('../constants');

/**
 * @param {{}} data
 * @param {string} message
 */
function created(data, message) {
  return {
    success: true,
    status: httpStatus.CREATED,
    data,
    message: message || Constants.CREATED_SUCCESSFULLY,
  };
}

function success(data) {
  return {
    success: true,
    status: httpStatus.OK,
    data,
  };
}

/**
 *
 * @param {number} code
 * @param {any} error
 */
function failed(code, error) {
  return {
    success: false,
    status: code || httpStatus.INTERNAL_SERVER_ERROR,
    error: error || Constants.UNEXPECTED_ERROR_OCCURED,
  };
}

module.exports = {
  created,
  failed,
  success,
};
