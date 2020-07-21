const axios = require("axios");

const get = (config) => {
  return new Promise((resolve, reject) => {
    axios
      .get(config.hostname + config.path, config.headers)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject({});
      });
  });
};
module.exports = get;
