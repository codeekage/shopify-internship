const fs = require('fs');
const AWS = require('aws-sdk');
const { randomHex } = require('../utils/crypto');

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

function promisifyListImage() {
  return new Promise((resolve, reject) => {
    s3.listObjects({
      Bucket: process.env.AWS_BUCKET_NAME,
    }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
}

async function uploadImageToS3({ image }) {
  try {
    const imageUploadName = image.name;
    const hexId = randomHex(15);
    const extension = imageUploadName.substr(imageUploadName.length - 3);
    const fileContent = fs.readFileSync(image.tempFilePath);
    const uploadDate = Date.now();
    const result = await promisifyImageUpload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${hexId}_${uploadDate}.${extension}`,
      Body: fileContent,
      ContentType: image.mimetype,
      ContentMD5: image.md,
    });
    return result;
  } catch (error) {
    return error;
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
    return error;
  }
}

async function listImageFromS3() {
  try {
    const result = await promisifyListImage();
    return { ...result };
  } catch (error) {
    return error;
  }
}

module.exports = {
  uploadImageToS3,
  readImageFromS3,
  listImageFromS3,
};
