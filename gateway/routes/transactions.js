const express = require('express');
const { purchaseImageController } = require('../controllers/transactions');
const { verifyImagePermissionHandler } = require('../middleware/auth');
const { listUserInventoryController } = require('../controllers/inventory');

const routes = express.Router();

routes.post('/purchase/:imageId', verifyImagePermissionHandler, purchaseImageController);
routes.get('/history', listUserInventoryController);

module.exports = routes;
