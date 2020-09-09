const insertarAdmision = () => {
  return {
    hostname: process.env.URL_BASE_MICROSERVICE_DATABASE,
    path: `/api/admisiondigital `,
  };
};

const getAdmisionByID = (id) => {
  return {
    hostname: process.env.URL_BASE_MICROSERVICE_DATABASE,
    path: `/api/admisiondigital/${id}`,
  };
};

module.exports = { insertarAdmision, getAdmisionByID };
