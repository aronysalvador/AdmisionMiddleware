const getConfigEmpresa = (bp) => {
  return {
    hostname: `http://sfc-qa-middleware.eastus.cloudapp.azure.com:8080`,
    path : `/api/BP/ObtenerDatosEmpresa?numeroEmpresa=${bp}`,
    headers: { headers: {
        'Ocp-Apim-Subscription-Key': '2b4beff42a5b433cad5bb1bc67b81fc3'
    }
      }
  }
}

const getConfigVigencia = (rut) => {
  return {
    hostname: `https://api.achs.cl`,
    path: `/Concurrencia/vigencia?IP_RUT_EMPRESA=${rut}`,
    headers: { headers: {
        'Ocp-Apim-Subscription-Key': 'c08395f6acd5403fbcb30560053e4dec'
    }
      }
  }
}

module.exports = {getConfigEmpresa,getConfigVigencia}