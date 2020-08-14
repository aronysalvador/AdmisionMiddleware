const getConfigCitasFuturas = (IPBpPersona) => {
    return {
        hostname: ` https://ams-qa-midleware.azure-api.net/`,
        path : `AdmisionDigital/api/Salud/ObternerCitasFuturasporBP?IPBpPersona=${IPBpPersona}`,
        headers: { 
            headers: {
                'Ocp-Apim-Subscription-Key': '2b4beff42a5b433cad5bb1bc67b81fc3'
            }
        }
    }
  }
  module.exports = getConfigCitasFuturas