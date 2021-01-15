/* eslint-disable camelcase */
const numeral = require('numeral');
const { BAD_REQUEST, NOT_FOUND } = require('http-status');
const {
  db, Images, User, Transactions, PayPal,
} = require('../models');
const {
  performTransactionWithRetry,
  commitWithRetry,
} = require('../utils/mongo');
const { generateRandomString, generateRandomNumber } = require('../utils/rand');
const { failed, created, success } = require('../utils/responses');
const { handleInventoryTransactions } = require('./inventory');
const { createPayPalPayment, savePayPalTransaction, executePayPalPayment } = require('../helper/paypal');
const { getUser } = require('../helper/users');
const { getDownloadLink } = require('../helper/cloudinary');

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

async function purchaseImage({ imageId, userId }) {
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
    const { userId: ownerId, price } = imageData;
    const ownerData = await getUser({ userId: ownerId });
    if (!ownerData.success) {
      return failed(null, ownerData.error);
    }
    const { username } = ownerData.data;
    const formattedPrice = numeral(price / 100).format('0,00.00');
    const soft_descriptor = `SIMG${generateRandomNumber(7)}`;
    const initiaPayment = await createPayPalPayment({
      amount: {
        total: formattedPrice,
        currency: 'USD',
        details: {
          subtotal: formattedPrice,
        },
      },
      description: `You are paying for image: ${imageId} from ${username}`,
      custom: `SHOPFY_IMG_${generateRandomNumber(14)}`,
      invoice_number: `${generateRandomNumber(11)}`,
      soft_descriptor,
      item_list: {
        items: [
          {
            name: 'hat',
            price: formattedPrice,
            quantity: '1',
            sku: '1',
            currency: 'USD',
          },
        ],
      },
      note_to_payer:
        'Thank you for your interest in this image. Please, contact us for further assistance',
      redirect_urls: {
        return_url: process.env.REDIRECT_URL,
        cancel_url: process.env.REDIRECT_URL,
      },
    });
    const metadata = {
      ownerId, imageId, initiatorsId: userId, soft_descriptor,
    };
    const saveTranaction = await savePayPalTransaction(initiaPayment, metadata);
    if (!saveTranaction.success) {
      return failed(null, saveTranaction.error);
    }
    return created(initiaPayment);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return failed(null, error);
  }
}
async function processImagePurchase({ paymentId, payerId }) {
  const session = await db.startSession();
  session.startTransaction();
  try {
    const paypalTransaction = await PayPal.findOne({ pay_id: paymentId });
    if (!paypalTransaction) {
      return failed(BAD_REQUEST, 'Invalid transaction data');
    }
    const { state: existingState } = paypalTransaction;
    if (existingState !== 'created') {
      return failed(BAD_REQUEST, `Transaction is already ${existingState}`);
    }
    const executePayPayRequest = await executePayPalPayment({
      payer_id: payerId,
      payment_id: paymentId,
    });

    const { state } = executePayPayRequest;
    if (state !== 'approved') {
      return failed(BAD_REQUEST, executePayPayRequest);
    }
    const {
      id, cart, payer, transactions,
    } = executePayPayRequest;
    const {
      soft_descriptor: after_payment_soft_descriptor,
      payee,
    } = transactions[0];
    const savedPayPalTranx = await PayPal.findOneAndUpdate({ pay_id: id }, {
      $set: {
        cart,
        payer,
        payee,
        state,
        after_payment_soft_descriptor,
      },
    }, { new: true });
    const { metadata, amount } = savedPayPalTranx;
    const { imageId, ownerId, initiatorsId } = metadata;
    const txnFunc = getCreditTranactions({
      ownerId,
      buyerId: initiatorsId,
      paidAmount: Number(amount.total),
      imageId,
      metadata: {
        sub_type: 'purchase_image',
      },
    });
    const transaction = await performTransactionWithRetry(txnFunc, session);
    if (!transaction.success) {
      await session.abortTransaction();
      session.endSession();
      return failed(null, transaction.error);
    }
    const creditAccount = await creditUser({
      amount: amount.total,
      userId: ownerId,
      session,
    });
    const inventory = await handleInventoryTransactions({
      purchaserId: initiatorsId,
      ownerId,
      amount: amount.total,
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
    const imageData = await Images.findById(imageId).lean();
    if (!imageData) {
      return failed(NOT_FOUND, 'Image does not exists.');
    }
    const { imageURL } = imageData.imageStore;
    const downloadLink = await getDownloadLink({ imageURL });
    return created({ ...data, downloadLink });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    return failed(null, error);
  }
}

module.exports = {
  purchaseImage,
  processImagePurchase,
};
