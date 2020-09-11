const getConfigRegiones = () => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `/DatosGenerales/v1/Regiones`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigRegiones;
