const { NOT_FOUND } = require('http-status');
const { ENUMS, ERRORS } = require('../constants');
const { Inventory } = require('../models');
const { failed, created, success } = require('../utils/responses');

async function handleInventoryTransactions({
  purchaserId, ownerId, imageId, session, amount,
}) {
  try {
    const [PURCHASED, SOLD] = ENUMS.INVENTORY_TYPES;
    const inventory = await Inventory.create([
      {
        imageId,
        userId: purchaserId,
        type: PURCHASED,
        amount,
      },
      {
        imageId,
        userId: ownerId,
        type: SOLD,
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
      return failed(NOT_FOUND, ERRORS.USER_INEVENTORY_NOT_FOUND);
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
