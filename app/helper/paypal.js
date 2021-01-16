/* eslint-disable camelcase */
const { BAD_REQUEST } = require('http-status');
const { axiosInstance } = require('../utils/axios');
const { PAYPAL } = require('../constants');
const { PayPal } = require('../models');
const { failed, success } = require('../utils/responses');

async function createPayPalPayment({
  amount,
  description,
  custom,
  invoice_number,
  soft_descriptor,
  item_list,
  note_to_payer,
  redirect_urls,
}) {
  try {
    const instance = await axiosInstance();
    const paymentRequest = await instance.post('/payments/payment', {
      intent: PAYPAL.INTENT,
      payer: {
        payment_method: PAYPAL.DEAFAULT,
      },
      transactions: [
        {
          amount,
          description,
          custom,
          invoice_number,
          payment_options: {
            allowed_payment_method: PAYPAL.INSTANT_FUNDING_SOURCE,
          },
          soft_descriptor,
          item_list,
        },
      ],
      note_to_payer,
      redirect_urls,
    });

    return paymentRequest.data;
  } catch (error) {
    console.error(error.response.data);
    return failed(BAD_REQUEST, error.data);
  }
}

async function executePayPalPayment({ payer_id, payment_id }) {
  try {
    const instance = await axiosInstance();
    const executeRequest = await instance.post(
      `/payments/payment/${payment_id}/execute`,
      {
        payer_id,
      },
    );
    return executeRequest.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function savePayPalTransaction(payload, metadata) {
  try {
    const {
      id, create_time, state, update_time, intent, links,
    } = payload;
    const {
      description, custom, invoice_number, amount, item_list,
    } = payload.transactions[0];
    const {
      ownerId, imageId, initiatorsId, soft_descriptor,
    } = metadata;
    const paypalTransaction = await PayPal.create({
      pay_id: id,
      intent,
      state,
      custom,
      amount,
      invoice_number,
      soft_descriptor,
      metadata: {
        create_time,
        update_time,
        description,
        imageId,
        item_list,
        ownerId,
        initiatorsId,
      },
      links,
    });
    return success(paypalTransaction);
  } catch (error) {
    return failed(BAD_REQUEST, error);
  }
}

async function getPaymentStatus({ payment_id }) {
  try {
    const instance = await axiosInstance();
    const paymentStatus = await instance.get(`/payments/payment/${payment_id}`);
    return paymentStatus.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  createPayPalPayment,
  executePayPalPayment,
  savePayPalTransaction,
  getPaymentStatus,
};
