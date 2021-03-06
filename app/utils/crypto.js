const crypto = require('crypto');

const algorithm = 'aes-256-ctr';
const secretKey = process.env.CRYPTO_SECRET;

const iv = crypto.randomBytes(16);

const encrypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('base64'),
    content: encrypted.toString('base64'),
  };
};

const decrypt = (hash) => {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'base64'));

  const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'base64')), decipher.final()]);

  return decrpyted.toString();
};

const randomHex = (length) => crypto.randomBytes(length).toString('hex');

module.exports = {
  encrypt,
  decrypt,
  randomHex,
};
