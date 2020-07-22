const getConfigRegion = () => {
    return {
        url: `http://sfc-desa-middleware.eastus.cloudapp.azure.com:8080/api/dominios/ObtenerListadoRegiones`,
        headers: { 
            headers: {
                'Content-Type': 'application/json'
            }
        }
    }
  }
  module.exports = getConfigRegion