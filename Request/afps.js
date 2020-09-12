const getConfigAFP = () => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `${process.env.RUTA_URL_MIDDLEWARE_API_1}Afp`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigAFP;
