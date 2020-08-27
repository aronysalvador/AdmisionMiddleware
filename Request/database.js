const insertarAdmision = () => {
  return {
    hostname: `https://wa-desa-bd.azurewebsites.net`,
    path: `/api/admisiondigital `,
  };
};

const getAdmisionByID = (id) => {
  return {
    hostname: `https://wa-desa-bd.azurewebsites.net`,
    path: `/api/admisiondigital/${id}`,
  };
};

module.exports = { insertarAdmision, getAdmisionByID };
