const express = require('express');
const { getUserProfile } = require('../controllers/users');

const routes = express.Router();

routes.get('/profile', getUserProfile);

module.exports = routes;
