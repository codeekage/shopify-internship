const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const connectionErrorHandler = (err) => {
  try {
    if (err) throw err;
    console.info('DB Connection, successful');
  } catch (error) {
    console.error(error);
  }
};

mongoose.connect(
  process.env.MONGO_URL,
  {
    keepAlive: true,
    connectTimeoutMS: 30000,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    socketTimeoutMS: 0,
  },
  connectionErrorHandler,
);

module.exports = mongoose;
