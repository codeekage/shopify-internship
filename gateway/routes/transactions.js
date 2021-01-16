const express = require('express');
const { purchaseImageController, processImagePurchaseController } = require('../controllers/transactions');
const { verifyImagePermissionHandler } = require('../middleware/auth');
const { listUserInventoryController } = require('../controllers/inventory');
const { schemaLoader, purchaseImageSchema, processImagePurchaseSchema } = require('../middleware/schema');

const routes = express.Router();

routes.post('/purchase/:imageId', verifyImagePermissionHandler, schemaLoader(purchaseImageSchema), purchaseImageController);
routes.post('/process-payment', schemaLoader(processImagePurchaseSchema), processImagePurchaseController);
routes.get('/history', listUserInventoryController);

module.exports = routes;
