
const getNivel1 = () => {
  return {
    hostname: "https://ams-qa-midleware.azure-api.net",
    path: "/AdmisionDigital/api/Dominios/ObtenerAlertadeCalificacionNivel1",
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
      },
    },
  };
};

const getNivel2 = () => {
  return {
    hostname: "https://ams-qa-midleware.azure-api.net",
    path: "/AdmisionDigital/api/Dominios/ObtenerAlertadeCalificacionNivel2",
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
      },
    },
  };
};

const getNivel3 = () => {
  return {
    hostname: "https://ams-qa-midleware.azure-api.net",
    path: "/AdmisionDigital/api/Dominios/ObtenerAlertadeCalificacionNivel3",
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
      },
    },
  };
};

module.exports = {getNivel1,getNivel2,getNivel3};
