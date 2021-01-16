/* eslint-disable camelcase */
const cloudinary = require('cloudinary').v2;

const {
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET,
  CLOUDINARY_CLOUD_NAME,
} = process.env;
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const getImageS3URI = (imageURL) => imageURL.replace('https', 's3')
  .replace('.s3.amazonaws.com', '');

const useWaterMarker = (permission, watermark) => {
  if (watermark) {
    return 'shopify_icon';
  } if (permission === 'public') {
    return 'shopify_icon';
  }
  return undefined;
};

/**
 *
 * @param {{ imageURL: string, metadata: string[] }} param0
 */
async function transformImage({
  imageURL, metadata, permission, watermark,
}) {
  try {
    const s3URI = getImageS3URI(imageURL);
    const cloudinaryUpload = await cloudinary.uploader.upload(
      `${s3URI}`,
      {
        folder: 'shopify_internship',
        type: 'private',
        tags: metadata.join(','),
        transformation: {
          overlay: useWaterMarker(permission, watermark),
        },
      },
    );
    return cloudinaryUpload;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getDownloadLink({ imageURL }) {
  try {
    const s3URI = getImageS3URI(imageURL);
    const cloudUpload = await cloudinary.uploader.upload(
      `${s3URI}`,
      {
        folder: 'shopify_internship',
        type: 'private',
        tags: 'downloadable',
        attachment: true,
      },
    );
    const { public_id, format } = cloudUpload;
    const downloadLink = await cloudinary.utils.private_download_url(public_id, format);
    return downloadLink;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  transformImage,
  getDownloadLink,
};
