const blockMessage = (ttl) => `Too many invalid logins. You've been blocked from accessing this page. ${Math.round(ttl / 60)}mins`;

const retryCountBlockMessage = (retriesLeft) => `You have ${!retriesLeft ? 0 : retriesLeft} retries left before getting blocked`;

module.exports = {
  blockMessage,
  retryCountBlockMessage,
};
