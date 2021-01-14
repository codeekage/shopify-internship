const { BAD_REQUEST, NOT_FOUND } = require('http-status');
const {
  db, Images, User, Transactions,
} = require('../models');
const {
  performTransactionWithRetry,
  commitWithRetry,
} = require('../utils/mongo');
const { generateRandomString } = require('../utils/rand');
const { failed, created, success } = require('../utils/responses');
const { handleInventoryTransactions } = require('./inventory');

function getCreditTranactions({
  ownerId,
  buyerId,
  imageId,
  paidAmount,
  metadata,
}) {
  return async function txnFunc(session) {
    const transactionRef = generateRandomString(10);
    const [transaction] = await Transactions.create(
      [
        {
          ownerId,
          buyerId,
          paidAmount,
          imageId,
          metadata,
          transactionRef,
        },
      ],
      { session },
    );
    return { success: true, data: { transaction } };
  };
}

async function creditUser({ amount, userId, session }) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      return failed(NOT_FOUND, 'User does not exist');
    }
    const creditWallet = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { $inc: { wallet: amount } },
      { new: true, session },
    );
    if (!creditWallet) {
      return failed(null, 'Failed to update wallet balance');
    }
    return success(creditWallet);
  } catch (error) {
    return failed(null, error);
  }
}

async function purchaseImage({ imageId, userId, amount }) {
  const session = await db.startSession();
  session.startTransaction();
  try {
    const imageOwner = await Images.findOne({ _id: imageId, userId }).lean();
    if (imageOwner) {
      return failed(BAD_REQUEST, 'You cannot buy an image you own.');
    }
    const imageData = await Images.findById(imageId).lean();
    if (!imageData) {
      return failed(NOT_FOUND, 'Image does not exists.');
    }
    const { userId: ownerId, price, discount } = imageData;
    if (price > amount) {
      return failed(BAD_REQUEST, 'You cannot purchase this image.');
    }
    const txnFunc = getCreditTranactions({
      ownerId,
      buyerId: userId,
      paidAmount: amount,
      imageId,
      metadata: {
        sub_type: 'purchase_image',
        discount,
        price,
      },
    });

    const transaction = await performTransactionWithRetry(txnFunc, session);
    if (!transaction.success) {
      await session.abortTransaction();
      session.endSession();
      return failed(null, transaction.error);
    }
    const creditAccount = await creditUser({
      amount,
      userId: ownerId,
      session,
    });
    const inventory = await handleInventoryTransactions({
      purchaserId: userId,
      ownerId,
      amount,
      session,
      imageId,
    });

    if (!creditAccount.success) {
      await session.abortTransaction();
      session.endSession();
      return failed(null, creditAccount.error);
    }
    if (!inventory.success) {
      await session.abortTransaction();
      session.endSession();
      return failed(null, inventory.error);
    }

    await commitWithRetry(session);
    const { data } = transaction;
    data.transaction.ownerId = undefined;
    data.transaction.buyerId = undefined;
    data.transaction._id = undefined;
    return created(data);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return failed(null, error);
  }
}

module.exports = {
  purchaseImage,
};
