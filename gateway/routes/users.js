const express = require('express');
const { createUserController } = require('../controllers/users');

const routes = express.Router();

routes.post('/create', createUserController);

module.exports = routes;
