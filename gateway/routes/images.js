const express = require('express');
const expressFileUpload = require('express-fileupload');
const { imageUploadController } = require('../controllers/images');
const { schemaLoader, imageUploadSchema } = require('../middleware/schema');

const routes = express.Router();

routes.use(expressFileUpload({
  safeFileNames: true,
  createParentPath: true,
  preserveExtension: true,
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

routes.post('/upload', schemaLoader(imageUploadSchema), imageUploadController);

module.exports = routes;
