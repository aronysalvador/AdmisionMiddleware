const axios = require("axios");
/**
 *
 * @param {*} url
 * @param {*} data
 */
const sapHttpPost = async (url, data) => {
  let { status } = await axios.post(url, data, {
    auth: {
      username: process.env.SAP_PO_USERNAME,
      password: process.env.SAP_PO_PASSWORD,
    },
  });
  return status;
};

module.exports = sapHttpPost;
