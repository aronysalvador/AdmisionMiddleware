const getConfigCotizacion = (rut, periodo) => {
  return {
    hostname: "https://ams-qa-midleware.azure-api.net",
    path: `/AdmisionDigital/Trabajador/Cotizaciones?RUT=${rut}&Periodo=${periodo}`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
    },
  };
};
module.exports = getConfigCotizacion;
