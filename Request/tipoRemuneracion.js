const getConfigTipoRemuneracion = () => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: "/AdmisionDigital/api/Dominios/ObtenerListadoTiposRemuneracion",
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigTipoRemuneracion;
