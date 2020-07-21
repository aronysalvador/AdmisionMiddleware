const getConfigEmpresa = (bp) => {
  return {
    url: `http://sfc-qa-middleware.eastus.cloudapp.azure.com:8080/api/BP/ObtenerDatosEmpresa?numeroEmpresa=${bp}`,
    headers: { headers: {
        'Ocp-Apim-Subscription-Key': '2b4beff42a5b433cad5bb1bc67b81fc3'
    }
      }
  }
}
module.exports = getConfigEmpresa