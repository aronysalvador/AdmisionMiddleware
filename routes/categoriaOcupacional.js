const Router = require("express-promise-router");
const categoriaOcupacionalRequest = require("../Request/categoriaOcupacional");
const http = require("../Utils/ApiUtil/http");
const apiResponseReducer = require("../Utils/ApiUtil/apiResponseReducer");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const result = await http(categoriaOcupacionalRequest());
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
    ({ idCategoriaOcupacional, descripcionCategoriaOcupacional }) => {
      return {
        id: idCategoriaOcupacional,
        nombre: descripcionCategoriaOcupacional,
      };
    }
  ));
};
module.exports = route;
