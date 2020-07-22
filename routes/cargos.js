const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");
const cargosRequest = require("../Request/cargos");
const http = require("../Utils/ApiUtil/http");
const data = require("../Utils/cargos.json");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    res.send(data);
  } catch (error) {
    res.send(apiResponse([], 500, "Ha ocurrido un error"));
  }
});

module.exports = route;
