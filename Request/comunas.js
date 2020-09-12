const getConfigComunas = () => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `${process.env.RUTA_URL_MIDDLEWARE_API_1}Comunas`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigComunas;
