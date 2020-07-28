const Router = require("express-promise-router");
const regionesRequest = require("../Request/regiones");
const http = require("../Utils/ApiUtil/http");
const regiones = require("../Utils/regiones.json");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const response = apiResponse(regiones, 200, "Operacion exitosa");
    return res.send(response);
  } catch (error) {
    const response = apiResponse([], res.status, "Error");
    return res.send(response);
  }
});

module.exports = route;
