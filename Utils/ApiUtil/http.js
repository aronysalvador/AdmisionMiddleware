const axios = require("axios");

const get = (config) => {
  return new Promise((resolve, reject) => {
    const url = config.hostname + config.path;
    axios
      .get(url, config.headers)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject({});
      });
  });
};
module.exports = get;
