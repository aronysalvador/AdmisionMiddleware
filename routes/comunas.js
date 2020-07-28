const Router = require("express-promise-router");
const regionesRequest = require("../Request/regiones");
const http = require("../Utils/ApiUtil/http");
const comunas = require("../Utils/comunas.json");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    const comunasRegion = comunas.filter((x) => x.parent == id);
    const response = apiResponse(comunasRegion, 200, "Operacion exitosa");
    return res.send(response);
  } catch (error) {
    const response = apiResponse([], !res.status ? 500 : res.status, "Error");
    return res.send(response);
  }
});

module.exports = route;
