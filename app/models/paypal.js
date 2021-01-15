const { Schema } = require('mongoose');

const PayPalSchema = new Schema(
  {
    intent: String,
    pay_id: { type: String, required: true },
    amount: { type: Object, required: true },
    invoice_number: { type: String, required: true },
    soft_descriptor: { type: String, required: true },
    transactionId: { type: String },
    custom: { type: String, required: true },
    metadata: { type: Object, required: true },
    links: {
      type: [
        {
          href: String,
          rel: String,
          method: String,
        },
      ],
      required: true,
    },
    state: { type: String, required: true },
    payer: Object,
    after_payment_soft_descriptor: String,
    cart: String,
    payee: Object,
  },
  { timestamps: true },
);

module.exports = PayPalSchema;
