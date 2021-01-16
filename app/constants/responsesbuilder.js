const blockMessage = (ttl) => `Too many invalid logins. You've been blocked from accessing this page. ${Math.round(ttl / 60)}mins`;

const retryCountBlockMessage = (retriesCount) => `You have ${!retriesCount ? 0 : retriesCount} retries left before getting blocked`;

const monogoDuplicateError = (key, type) => `${type} with this ${key} already exists.`;

const imageUpdateMessage = (query) => `Image [${JSON.stringify(query)}] updated`;

const transactionStateError = (state) => `Transaction is already ${state}`;

module.exports = {
  blockMessage,
  retryCountBlockMessage,
  monogoDuplicateError,
  imageUpdateMessage,
  transactionStateError,
};
