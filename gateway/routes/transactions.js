const express = require('express');
const { purchaseImageController, processImagePurchaseController } = require('../controllers/transactions');
const { verifyImagePermissionHandler } = require('../middleware/auth');
const { listUserInventoryController } = require('../controllers/inventory');

const routes = express.Router();

routes.post('/purchase/:imageId', verifyImagePermissionHandler, purchaseImageController);
routes.post('/process-payment', processImagePurchaseController);
routes.get('/history', listUserInventoryController);

module.exports = routes;
