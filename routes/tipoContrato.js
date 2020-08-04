const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");
const jornadaTrabajoRequest = require("../Request/tipoContrato");
const http = require("../Utils/ApiUtil/http");
const apiResponseReducer = require("../Utils/ApiUtil/apiResponseReducer");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const result = await http(jornadaTrabajoRequest());
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
    ({ idTipoContrato, descripcionTipoContrato }) => {
      return { id: idTipoContrato, nombre: descripcionTipoContrato };
    }
  ));
};
module.exports = route;
