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
    hostname: `https://ams-qa-midleware.azure-api.net`,
    path: `/AdmisionDigital/VigenciaEmpresa?rutEmpresa=${rut}`,
    headers: { headers: {
        'Ocp-Apim-Subscription-Key': '2b4beff42a5b433cad5bb1bc67b81fc3'
    }
      }
  }
}

const getConfigSucursales = (rut) => {
  return {
    hostname: `https://ams-qa-midleware.azure-api.net`,
    path: `/AdmisionDigital/api/BP/ObtenerSucursalesEmpresaPorRut?RutEmp=${rut}`,
    headers: { headers: {
        'Ocp-Apim-Subscription-Key': '2b4beff42a5b433cad5bb1bc67b81fc3'
    }
      }
  }
}
module.exports = {getConfigEmpresa,getConfigVigencia,getConfigSucursales}