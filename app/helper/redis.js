const { redis } = require('../utils/redis');
const Constants = require('../constants');
const { UNEXPECTED_ERROR_OCCURED } = require('../constants');
const { blockMessage } = require('../constants/responsesbuilder');

/**
 *
 * @param {{key: string, types: string[], type: string}} param0
 */
function generateRedisKey({ key, types, type }) {
  const keyPrefixing = `${Constants.REDIS_KEY_PREFIX}${key}_$$`;
  if (type) return `${keyPrefixing}${type}`;

  return `${keyPrefixing}${types}`
    .split(',').join(`,${keyPrefixing}`)
    .split(',');
}

async function isBlocked({ blockKey }) {
  try {
    const [, cooldownKey, isBlockedKey] = generateRedisKey(
      {
        key: blockKey,
        types: Constants.REDIS_KEYS,
      },
    );
    const ttl = await redis.ttl(cooldownKey);
    const status = await redis.get(isBlockedKey);
    if (ttl < 0) await redis.del(isBlockedKey);
    return { status, message: blockMessage(ttl) };
  } catch (error) {
    console.error(error);
    return { error };
  }
}

/**
 * @param {{block: string, expiresIn: number, retryCount: number}} param
 */
async function addToBlockList({ block, expiresIn, retryCount }) {
  try {
    const [requestCountKey, cooldownKey, isBlockedKey] = generateRedisKey(
      {
        key: block,
        types: Constants.REDIS_KEYS,
      },
    );
    const ttl = await redis.ttl(cooldownKey);
    if (ttl > 0) {
      await redis.set(isBlockedKey, true);
      return {
        status: true,
        message: blockMessage(ttl),
      };
    }
    await redis.set(isBlockedKey, false);
    const requestCalls = await redis.incr(requestCountKey);
    if (requestCalls >= retryCount) {
      await redis.set(cooldownKey, 1, 'EX', 60 * expiresIn);
      await redis.del(requestCountKey);
      await redis.del(isBlockedKey);
    }
    return null;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: UNEXPECTED_ERROR_OCCURED,
    };
  }
}

module.exports = {
  addToBlockList,
  isBlocked,
};
