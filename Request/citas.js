const getConfigCitasFuturas = (IPBpPersona) => {
  return {
    hostname: `${process.env.BASE_URL_MIDDLEWARE_API}`,
    path: `${process.env.RUTA_URL_MIDDLEWARE_API_2}api/Salud/ObternerCitasFuturasporBP?IPBpPersona=${IPBpPersona}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigCitasFuturas;
