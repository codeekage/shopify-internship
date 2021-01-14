const express = require('express');
const expressFileUpload = require('express-fileupload');
const { imageUploadController, imageUpdateController } = require('../controllers/images');
const { schemaLoader, imageUploadSchema, imageUpdateSchema } = require('../middleware/schema');

const routes = express.Router();

routes.use(expressFileUpload({
  safeFileNames: true,
  createParentPath: true,
  preserveExtension: true,
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

routes.post('/upload', schemaLoader(imageUploadSchema), imageUploadController);
routes.put('/update/:imageId', schemaLoader(imageUpdateSchema), imageUpdateController);

module.exports = routes;
