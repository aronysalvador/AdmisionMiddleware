const insertarAdmision = () => {
  return {
    hostname: `http://localhost:3001`,
    path: `/api/admisiondigital `,
  };
};

const getAdmisionByID = (id) => {
  return {
    hostname: `http://localhost:3001`,
    path: `/api/admisiondigital/${id}`,
  };
};

module.exports = { insertarAdmision, getAdmisionByID };
