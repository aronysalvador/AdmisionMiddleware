const getConfigPaciente = (rut) => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `/AdmisionDigital/api/BP/ObtenerBPDatosGenerales?RutPer=${rut}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigPaciente;
