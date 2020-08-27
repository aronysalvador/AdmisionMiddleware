const Axios = require("axios");

const httpPost = async (config, body) => {
  const { hostname, path } = config;
  const { data, state } = await Axios.post(`${hostname}${path}`, body, {});
  return { data, state };
};

module.exports = { httpPost };
