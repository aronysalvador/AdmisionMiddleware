const getNivel1 = () => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: "/AdmisionDigital/api/Dominios/ObtenerAlertadeCalificacionNivel1",
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};

const getNivel2 = () => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: "/AdmisionDigital/api/Dominios/ObtenerAlertadeCalificacionNivel2",
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};

const getNivel3 = () => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: "/AdmisionDigital/api/Dominios/ObtenerAlertadeCalificacionNivel3",
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};

module.exports = { getNivel1, getNivel2, getNivel3 };
