const getConfigCitasFuturas = (IPBpPersona) => {
  return {
    hostname: `${process.env.BASE_URL_MIDDLEWARE_API}`,
    path: `/AdmisionDigital/api/Salud/ObternerCitasFuturasporBP?IPBpPersona=${IPBpPersona}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigCitasFuturas;
