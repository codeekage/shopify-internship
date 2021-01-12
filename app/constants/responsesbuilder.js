const blockMessage = (ttl) => `Too many invalid logins. You've been blocked from accessing this page. ${Math.round(ttl / 60)}mins`;

module.exports = {
  blockMessage,
};
