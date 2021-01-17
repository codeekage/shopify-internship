const express = require('express');
const expressFileUpload = require('express-fileupload');
const {
  imageUploadController, imageUpdateController, imageReadController, listPublicImagesController, listUserImagesController,
  imageReadFileController,
  deleteUserImageController,
} = require('../controllers/images');
const { verifyImagePermissionHandler, verifyImageOwnershipHandler } = require('../middleware/auth');
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

routes.get('/', listUserImagesController);
routes.get('/public', listPublicImagesController);
routes.get('/:imageId', schemaLoader(readImageSchema), verifyImagePermissionHandler, imageReadController);
routes.get('/render/:imageId', schemaLoader(readImageSchema), verifyImagePermissionHandler, imageReadFileController);
routes.put('/update/:imageId', schemaLoader(imageUpdateSchema), verifyImagePermissionHandler, verifyImageOwnershipHandler, imageUpdateController);
routes.delete('/delete/:imageId', schemaLoader(imageUpdateSchema), verifyImagePermissionHandler, verifyImageOwnershipHandler, deleteUserImageController);

module.exports = routes;
