const getConfigCotizacion = (rut, periodo) => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `/AdmisionDigital/Trabajador/Cotizaciones?RUT=${rut}&Periodo=${periodo}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
      },
    },
  };
};
module.exports = getConfigCotizacion;
