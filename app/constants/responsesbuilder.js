const blockMessage = (ttl) => `Too many invalid logins. You've been blocked from accessing this page. ${Math.round(ttl / 60)}mins`;

const retryCountBlockMessage = (retriesCount) => `You have ${!retriesCount ? 0 : retriesCount} retries left before getting blocked`;

module.exports = {
  blockMessage,
  retryCountBlockMessage,
};
