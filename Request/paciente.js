const getConfigPaciente = (rut) => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `/AdmisionDigital/api/BP/ObtenerBPDatosGenerales?RutPer=${rut}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigPaciente;
