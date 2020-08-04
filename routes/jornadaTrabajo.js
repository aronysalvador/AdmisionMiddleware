const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");
const jornadaTrabajoRequest = require("../Request/JornadaTrabajo");
const http = require("../Utils/ApiUtil/http");
const apiResponseReducer = require("../Utils/ApiUtil/apiResponseReducer");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const result = await http(jornadaTrabajoRequest());
    const response = apiResponseReducer(
      result,
      res.statusCode,
      "Operacion Exitosa"
    );
    res.send(response);
  } catch (error) {}
});

module.exports = route;
