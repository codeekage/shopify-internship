/* eslint-disable camelcase */
const numeral = require('numeral');
const { BAD_REQUEST, NOT_FOUND } = require('http-status');
const { ERRORS, SUB_TYPE, PAYPAL } = require('../constants');
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
const { transactionStateError } = require('../constants/responsesbuilder');

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
      return failed(NOT_FOUND, ERRORS.USER_NOT_EXIST);
    }
    const creditWallet = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      { $inc: { wallet: amount } },
      { new: true, session },
    );
    if (!creditWallet) {
      return failed(null, ERRORS.WALLET_UPDATE_FAILED);
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
      return failed(BAD_REQUEST, ERRORS.OWN_IMAGE);
    }
    const imageData = await Images.findById(imageId).lean();
    if (!imageData) {
      return failed(NOT_FOUND, ERRORS.IMAGE_NOT_FOUND);
    }
    const { userId: ownerId, price, name } = imageData;
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
        currency: PAYPAL.CURRENCY,
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
            name,
            price: formattedPrice,
            quantity: '1',
            sku: '1',
            currency: PAYPAL.CURRENCY,
          },
        ],
      },
      note_to_payer: PAYPAL.PAYER_NOTE,
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
async function processImagePurchase({ paymentId, payerId, userId }) {
  const session = await db.startSession();
  session.startTransaction();
  try {
    const paypalTransaction = await PayPal.findOne({ pay_id: paymentId, 'metadata.initiatorsId': userId });
    if (!paypalTransaction) {
      return failed(BAD_REQUEST, ERRORS.INVALID_TRANSACTION);
    }
    const { state: existingState } = paypalTransaction;
    if (existingState !== PAYPAL.TRANSACTION_STATE.CREATED) {
      return failed(BAD_REQUEST, transactionStateError(existingState));
    }
    const executePayPayRequest = await executePayPalPayment({
      payer_id: payerId,
      payment_id: paymentId,
    });

    const { state } = executePayPayRequest;
    if (state !== PAYPAL.TRANSACTION_STATE.APPROVED) {
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
        sub_type: SUB_TYPE.PURCHASE_IMAGE,
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
      return failed(NOT_FOUND, ERRORS.IMAGE_NOT_FOUND);
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
