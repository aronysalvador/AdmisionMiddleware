const getConfigEmpresa = (bp) => {
  return {
    hostname: `http://sfc-qa-middleware.eastus.cloudapp.azure.com:8080`,
    path: `/api/BP/ObtenerDatosEmpresa?numeroEmpresa=${bp}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
      },
    },
  };
};

const getConfigVigencia = (rut) => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `/AdmisionDigital/VigenciaEmpresa?rutEmpresa=${rut}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};

const getConfigSucursalesVigentes = (rut) => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `/AdmisionDigital/api/BP/ObtenerSucursalesVigentesEmpresaPorRUT?rut=${rut}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};

module.exports = {
  getConfigEmpresa,
  getConfigVigencia,
  getConfigSucursalesVigentes,
};
