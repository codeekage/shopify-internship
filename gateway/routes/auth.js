const express = require('express');
const { loginController } = require('../controllers/auth');

const routes = express.Router();

routes.post('/login', loginController);

module.exports = routes;
