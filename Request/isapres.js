const getIsapres = () => {
  return {
    hostname: "http://sfc-qa-middleware.eastus.cloudapp.azure.com:8080",
    path: `/api/dominios/ObtenerListadoIsapres`,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Ocp-Apim-Subscription-Key": "2b4beff42a5b433cad5bb1bc67b81fc3",
    },
  };
};
module.exports = getIsapres;
