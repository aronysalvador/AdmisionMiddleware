const Axios = require("axios");

const httpPost = async (config, body) => {
  const { hostname, path } = config;
  const { data, state } = await Axios.post(`${hostname}${path}`, body, {});
  return { data, state };
};

const httpGetRequest = async (config) => {
  const { hostname, path } = config;
  const { data } = await Axios.get(`${hostname}${path}`, {});
  return data;
};
module.exports = { httpPost, httpGetRequest };
