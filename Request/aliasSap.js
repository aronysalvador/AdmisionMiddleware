const getConfigAliasSap = (nick) => {
    return {
      hostname: `https://ams-qa-midleware.azure-api.net`,
      path : `/Integraciones/LDAPInfo/LDAPUserInfoByMailNickname?mailNickName=${nick}`,
      headers: { headers: {
          'Ocp-Apim-Subscription-Key': '2b4beff42a5b433cad5bb1bc67b81fc3'
      }
        }
    }
  }
  module.exports = getConfigAliasSap