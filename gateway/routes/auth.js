const express = require('express');
const { loginController } = require('../controllers/auth');
const { createUserController } = require('../controllers/users');
const { schemaLoader, loginSchema, signUpSchema } = require('../middleware/schema');

const routes = express.Router();

routes.post('/login', schemaLoader(loginSchema), loginController);
routes.post('/signup', schemaLoader(signUpSchema), createUserController);

module.exports = routes;
