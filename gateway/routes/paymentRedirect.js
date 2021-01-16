const express = require('express');
const HtmlResponse = require('../assets/payment');

const routes = express.Router();

routes.get('/redirect', (req, res) => {
  res.setHeader('content-type', 'text/html');
  res.send(HtmlResponse(req.query));
});

module.exports = routes;
