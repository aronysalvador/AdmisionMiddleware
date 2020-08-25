const Router = require("express-promise-router");
const tipoRemuneracionRequest = require("../Request/tipoRemuneracion");
const http = require("../Utils/ApiUtil/http");
const apiResponseReducer = require("../Utils/ApiUtil/apiResponseReducer");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const result = await http(tipoRemuneracionRequest());
    const response = apiResponseReducer(
      formatDatos(result),
      res.statusCode,
      "Operacion Exitosa"
    );
    res.send(response);
  } catch (error) {
    res.send(apiResponseReducer([], res.statusCode, error.message));
  }
});

const formatDatos = (datos) => {
  return (datosFormated = datos.map(
    ({ key, value }) => {
      return { id: key, nombre: value };
    }
  ));
};
module.exports = route;
