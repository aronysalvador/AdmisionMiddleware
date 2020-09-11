const axios = require("axios");
/**
 *
 * @param {*} url
 * @param {*} data
 */
const sapHttpPost = async (url, data) => {
  let { status } = await axios.post(url, data, {
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
    },
  });
  return status;
};

module.exports = sapHttpPost;
