require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./gateway/routes/users');
const authRoutes = require('./gateway/routes/auth');
const { PageNotFound, WelcomeHandler, ClientIPAddress } = require('./gateway/controllers/handler');

const app = express();

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(ClientIPAddress);

app.get('/v1', WelcomeHandler);
app.use('/v1/user', userRoutes);
app.use('/v1/auth', authRoutes);
app.use('*', PageNotFound);

app.listen(process.env.PORT, () => {
  console.info(`Application Running on PORT: ${process.env.PORT}`);
});
