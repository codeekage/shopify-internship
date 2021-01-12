'use strict';
require('dotenv').config();
const express = require('express');

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Application Running on PORT: ${process.env.PORT}`);
});
