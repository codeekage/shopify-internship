const randomString = require('randomstring');

const generateRandomString = (length) => randomString.generate({
  length,
  charset: 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz',
});

module.exports = {
  generateRandomString,
};
