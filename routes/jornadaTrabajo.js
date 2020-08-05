const Router = require("express-promise-router");
const jornadaTrabajoRequest = require("../Request/jornadaTrabajo");
const http = require("../Utils/ApiUtil/http");
const apiResponseReducer = require("../Utils/ApiUtil/apiResponseReducer");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const result = await http(jornadaTrabajoRequest());
    const {
      d: { results },
    } = result;
    const response = apiResponseReducer(
      formatDatos(results),
      res.statusCode,
      "Operacion Exitosa"
    );
    res.send(response);
  } catch (error) {
    res.send(apiResponseReducer([], res.statusCode, error.message));
  }
});

const formatDatos = (datos) => {
  return datos.map(({ Key_JornadaTrabajo, COD_JORNADA, TEXTO_JORNADA }) => {
    return {
      id: COD_JORNADA,
      nombre: TEXTO_JORNADA,
      key: Key_JornadaTrabajo,
    };
  });
};
module.exports = route;
