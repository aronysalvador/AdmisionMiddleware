const getConfigCitasFuturas = (IPBpPersona) => {
  return {
    hostname: `${process.env.BASE_URL_MIDDLEWARE_API}/`,
    path: `AdmisionDigital/api/Salud/ObternerCitasFuturasporBP?IPBpPersona=${IPBpPersona}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
      },
    },
  };
};
module.exports = getConfigCitasFuturas;
