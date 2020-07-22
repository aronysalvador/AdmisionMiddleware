const getConfigPaciente = (rut) => {
    return {
        hostname: `http://sfc-prod-middleware.eastus.cloudapp.azure.com:8080`,
        path : `/api/BP/ObtenerDatosPersonaPorRUT?rut=${rut}`,
        headers: { 
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
  }
  module.exports = getConfigPaciente