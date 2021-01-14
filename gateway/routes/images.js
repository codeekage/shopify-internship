const express = require('express');
const expressFileUpload = require('express-fileupload');
const {
  imageUploadController, imageUpdateController, imageReadController, imageReadBufferController,
} = require('../controllers/images');
const { verifyImagePermissionHandler } = require('../middleware/auth');
const {
  schemaLoader, imageUploadSchema, imageUpdateSchema, readImageSchema,
} = require('../middleware/schema');

const routes = express.Router();

routes.use(expressFileUpload({
  safeFileNames: true,
  createParentPath: true,
  preserveExtension: true,
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

routes.post('/upload', schemaLoader(imageUploadSchema), imageUploadController);
routes.get('/:imageId', schemaLoader(readImageSchema), verifyImagePermissionHandler, imageReadController);
routes.get('/read/:imageId', schemaLoader(readImageSchema), verifyImagePermissionHandler, imageReadBufferController);
routes.put('/update/:imageId', schemaLoader(imageUpdateSchema), verifyImagePermissionHandler, imageUpdateController);

module.exports = routes;
