const getConfigAliasSap = (nick) => {
  return {
    hostname: process.env.BASE_URL_MIDDLEWARE_API,
    path: `/AdmisionDigital/api/BP/ObtenerLDAPInfoUsuario?mailNickname=${nick}`,
    // path: `/Integraciones/LDAPInfo/LDAPUserInfoByMailNickname?mailNickName=${nick}`,
    headers: {
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.SUBSCRIPTION_KEY,
        "Ocp-Apim-Trace": "true",
      },
    },
  };
};
module.exports = getConfigAliasSap;
