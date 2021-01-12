const express = require('express');
const { createUserController, getUserProfile } = require('../controllers/users');

const routes = express.Router();

routes.post('/create', createUserController);
routes.get('/profile', getUserProfile);

module.exports = routes;
