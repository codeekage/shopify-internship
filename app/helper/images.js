const fs = require('fs');
const AWS = require('aws-sdk');
// const { randomHex } = require('../utils/crypto');
const { generateRandomString } = require('../utils/rand');
const { transformImage } = require('./cloudinary');
const { failed } = require('../utils/responses');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

function promisifyImageUpload({
  Bucket, Key, Body, ContentMD5, ContentType,
}) {
  return new Promise((resolve, reject) => {
    s3.upload({
      Bucket,
      Key,
      Body,
      ContentMD5,
      ContentType,
    }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

function promisifyImageRead({ imageKey, imageVersion }) {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageKey,
      VersionId: imageVersion,
    }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

function promisifyImageDelete({ imageKey }) {
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: imageKey,
    }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

async function uploadAndTransformImage({ image, metadata, permission }) {
  try {
    const imageUploadName = image.name;
    // const hexId = randomHex(15);
    const extension = imageUploadName.substr(imageUploadName.length - 3);
    const fileContent = fs.readFileSync(image.tempFilePath);
    const uploadDate = Date.now();
    const s3Upload = await promisifyImageUpload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${generateRandomString(10)}_${uploadDate}.${extension}`,
      Body: fileContent,
      ContentType: image.mimetype,
      ContentMD5: image.md,
    });
    const cloudinary = await transformImage({ imageURL: s3Upload.Location, metadata, permission });
    return { s3Upload, cloudinary };
  } catch (error) {
    console.error(error);
    return failed(null, error);
  }
}

async function readImageFromS3({ imageStore }) {
  try {
    const { imageURL, imageVersion } = imageStore;
    const imageKey = imageURL.split('/')[3];
    const result = await promisifyImageRead({
      imageKey, imageVersion,
    });
    return { ...result, imageKey };
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteImageFromS3({ imageStore }) {
  try {
    const { imageURL, imageVersion } = imageStore;
    const imageKey = imageURL.split('/')[3];
    const result = await promisifyImageDelete({
      imageKey, imageVersion,
    });
    return { ...result, imageKey };
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  uploadAndTransformImage,
  readImageFromS3,
  deleteImageFromS3,
};
