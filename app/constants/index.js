module.exports = {
  CREATED_SUCCESSFULLY: 'created successfully',
  UNEXPECTED_ERROR_OCCURED: 'An expected error occured',
  INVALID_LOGIN: 'Invalid username or password. Please, check and try again.',
  REDIS_KEY_PREFIX: '$$SHOPIFY_',
  REDIS_KEYS: ['REQUEST_COUNT', 'COOLDOWN', 'IS_BLOCKED', 'RETRY_COUNT'],
  USER_NOT_FOUND: 'User not found!',
  INVALID_CREDENTIALS: 'You are attempting an invalid credentials',
  ERRORS: {
    IMAGE_EXIST: 'Image already exist',
    IMAGE_NOT_FOUND: 'Image does not exists',
    NOTHING_TO_SEE: 'Nothing to see here.',
    USER_IMAGE_NOT_FOUND: 'No image for this user',
    USER_NOT_EXIST: 'User does not exist',
    USER_INEVENTORY_NOT_FOUND: 'No transaction yet on this account.',
    INVALID_TRANSACTION: 'Invalid transaction data',
    OWN_IMAGE: 'You cannot buy an image you own.',
    USER_NOT_FOUND: 'User not found!',
    WALLET_UPDATE_FAILED: 'Failed to update wallet balance',
    PRIVATE_IMAGE: 'This image is private and cannot be viewed. You might want to make it public to access it.',
  },
  SUB_TYPE: {
    PURCHASE_IMAGE: 'purchase_image',
  },
  ENV: {
    RETRY_COUNT: Number(process.env.RETRY_COUNT),
    BLOCK_EXPIRY_TIME: Number(process.env.BLOCK_EXPIRY_TIME),
  },
  ENUMS: {
    IMAGE_PERMISSIONS: ['private', 'public'],
    INVENTORY_TYPES: ['purchased', 'sold'],
  },
  PAYPAL: {
    DEAFAULT: 'paypal',
    INTENT: 'sale',
    INSTANT_FUNDING_SOURCE: 'INSTANT_FUNDING_SOURCE',
    TRANSACTION_STATE: {
      CREATED: 'created',
      APPROVED: 'approved',
    },
    CURRENCY: 'USD',
    PAYER_NOTE: 'Thank you for your interest in this image. Please, contact us for further assistance',
  },
  CLOUDINARY: {
    CLOUDONARY_UPLOAD_TYPE: 'private',
    CLOUDINARY_TAGS: {
      DOWNLOADABLE: 'downloadable',
    },
  },
  MONGO_TYPE: {
    USER: 'user',
    IMAGE: 'image',
  },
};
