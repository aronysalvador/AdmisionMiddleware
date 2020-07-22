const getConfigEmpresa = (bp) => {
  return {
    url: `http://sfc-qa-middleware.eastus.cloudapp.azure.com:8080/api/BP/ObtenerDatosEmpresa?numeroEmpresa=${bp}`,
    headers: { headers: {
        'Ocp-Apim-Subscription-Key': '2b4beff42a5b433cad5bb1bc67b81fc3'
    }
      }
  }
}

const getConfigVigencia = (rut) => {
  return {
    url: `https://api.achs.cl/Concurrencia/vigencia?IP_RUT_EMPRESA=${rut}`,
    headers: { headers: {
        'Ocp-Apim-Subscription-Key': 'c08395f6acd5403fbcb30560053e4dec'
    }
      }
  }
}

module.exports = {getConfigEmpresa,getConfigVigencia}