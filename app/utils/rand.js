const randomString = require('randomstring');

const generateRandomString = (length) => randomString.generate({
  length,
  charset: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
});

const generateRandomNumber = (length) => randomString.generate({
  length,
  charset: '0987654321',
});

module.exports = {
  generateRandomString,
  generateRandomNumber,
};
