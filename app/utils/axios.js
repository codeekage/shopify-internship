require('dotenv').config({ path: '../../.env' });
const axios = require('axios');
const axiosDefault = require('axios').default;
const qs = require('qs');

async function generateAccessToken() {
  try {
    const data = qs.stringify({
      grant_type: 'client_credentials',
    });
    const config = {
      method: 'post',
      url: process.env.PAYPAL_AUTH_URL,
      headers: {
        Authorization: `Basic ${process.env.PAYPAL_BASIC_AUTH}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data,
    };
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

/**
 * @returns {Promise<axios.AxiosInstance>}
 */
async function axiosInstance() {
  try {
    const authRequest = await generateAccessToken();
    const config = axiosDefault.create({
      baseURL: process.env.PAYPAL_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authRequest.access_token}`,
      },
    });
    return config;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = {
  axiosInstance,
};
