const express = require('express');
const expressFileUpload = require('express-fileupload');
const {
  imageUploadController, imageUpdateController, imageReadController, imageReadBufferController,
} = require('../controllers/images');
const { verifyImagePermissionHandler } = require('../middleware/auth');
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
// routes.use(verifyUserImage);
routes.get('/:imageId', verifyImagePermissionHandler, imageReadController);
routes.get('/read/:imageId', verifyImagePermissionHandler, imageReadBufferController);
routes.put('/update/:imageId', verifyImagePermissionHandler, schemaLoader(imageUpdateSchema), imageUpdateController);

module.exports = routes;
