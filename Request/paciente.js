const getConfigPaciente = (rut) => {
    return {
        url: `http://sfc-prod-middleware.eastus.cloudapp.azure.com:8080/api/BP/ObtenerDatosPersonaPorRUT?rut=${rut}`,
        headers: { 
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
  }
  module.exports = getConfigPaciente