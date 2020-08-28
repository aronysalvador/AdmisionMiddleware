const axios = require("axios");
/**
 *
 * @param {*} url
 * @param {*} data
 */
const sapHttpPost = async (url, data) => {
  let { status } = await axios.post(url, data, {
    headers: {
      "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
    },
  });
  return status;
};

module.exports = sapHttpPost;
