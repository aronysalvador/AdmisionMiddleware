const getConfigVigencia = (rut) => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `VigenciaEmpresa?rutEmpresa=${rut}`,
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
    path: `ObtenerSucursalesVigentesEmpresaPorRUT?rut=${rut}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};

module.exports = {
  getConfigVigencia,
  getConfigSucursalesVigentes,
};
