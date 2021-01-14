module.exports = {
  CREATED_SUCCESSFULLY: 'created successfully',
  UNEXPECTED_ERROR_OCCURED: 'An expected error occured',
  INVALID_LOGIN: 'Invalid username or password. Please, check and try again.',
  REDIS_KEY_PREFIX: '$$SHOPIFY_',
  REDIS_KEYS: ['REQUEST_COUNT', 'COOLDOWN', 'IS_BLOCKED', 'RETRY_COUNT'],
  USER_NOT_FOUND: 'User not found!',
  INVALID_CREDENTIALS: 'You are attempting an invalid credentials',
  ENV: {
    RETRY_COUNT: Number(process.env.RETRY_COUNT),
    BLOCK_EXPIRY_TIME: Number(process.env.BLOCK_EXPIRY_TIME),
  },
  ENUMS: {
    IMAGE_PERMISSIONS: ['private', 'public'],
  },
};
