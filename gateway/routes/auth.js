const express = require('express');
const { loginController } = require('../controllers/auth');
const { createUserController } = require('../controllers/users');

const routes = express.Router();

routes.post('/login', loginController);
routes.post('/signup', createUserController);

module.exports = routes;
