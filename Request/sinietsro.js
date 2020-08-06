const getConfigSiniestro = (rut) => {
    return {
        hostname: `https://ams-qa-midleware.azure-api.net`,
        path : `/siniestro/v1/HistorialSiniestros?RUT=${rut}`,
        headers: { 
            headers: {
                'Ocp-Apim-Subscription-Key': '2b4beff42a5b433cad5bb1bc67b81fc3'
            }
        }
    }
  }
  module.exports = getConfigSiniestro