const getConfigSiniestro = (BPSiniestro) => {
  return {
    hostname: `${process.env.BASE_URL_MIDDLEWARE_API}`,
    path: `/AdmisionDigital/api/Siniestros/ObtenerDatosSiniestrosPorBP?BPSiniestro=${BPSiniestro}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigSiniestro;
