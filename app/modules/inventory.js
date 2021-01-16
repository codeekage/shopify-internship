const { NOT_FOUND } = require('http-status');
const { Inventory } = require('../models');
const { failed, created, success } = require('../utils/responses');

async function handleInventoryTransactions({
  purchaserId, ownerId, imageId, session, amount,
}) {
  try {
    const inventory = await Inventory.create([
      {
        imageId,
        userId: purchaserId,
        trasnactionType: 'purchased',
        amount,
      },
      {
        imageId,
        userId: ownerId,
        trasnactionType: 'sold',
        amount,
      },
    ], { session });

    return created(inventory);
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

async function listUserInventoryTransactions({ userId }) {
  try {
    const inventory = await Inventory.find({ userId }).lean();
    if (!inventory) {
      return failed(NOT_FOUND, 'No transaction yet on this account.');
    }

    return success({ inventory });
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

module.exports = {
  handleInventoryTransactions,
  listUserInventoryTransactions,
};
