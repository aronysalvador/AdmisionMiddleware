const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");
const isapresRequest = require("../Request/isapres");
const http = require("../Utils/ApiUtil/http");
const isapres = require("../Utils/isapres.json");
const route = new Router();

/**
 * Devuelve la lista de isapres en chile
 */

route.get("/", async (req, res) => {
  try {
    const response = apiResponse(isapres, 200, "Operacion exitosa");
    return res.send(response);
  } catch (error) {
    const response = apiResponse([], res.status, "Error");
    return res.send(response);
  }
});
module.exports = route;
