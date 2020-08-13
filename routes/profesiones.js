const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseObjectReducer");
const getConfiProfesiones = require("../Request/profesiones");
const get = require("../Utils/ApiUtil/http");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const profesionesResponse = await get(getConfiProfesiones());
    const profesionesResult = profesionesResponse.map(({ key, value }) => {
      return { codigo: key, nombre: getNameProfesion(value) };
    });
    const response = apiResponse(
      profesionesResult,
      res.statusCode,
      "Operacion exitosa"
    );
    res.send(response);
  } catch (error) {
    res.send(apiResponse([], 500, error));
  }
});

const getNameProfesion = (name) => {
  return name.split(";")[0];
};

module.exports = route;
