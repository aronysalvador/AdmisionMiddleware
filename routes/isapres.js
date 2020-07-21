const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");
const execHttps = require("../Utils/ApiUtil/https");
const isapres = require("../Request/isapres");

const route = new Router();

/**
 * Devuelve la lista de isapres en chile
 */

route.get("/isapres", async (req, res) => {
  try {
    const responseAPI = await execHttps(isapres);
    const response = apiResponse(responseAPI, res.status, "Operacion exitosa");
    return res.send(response);
  } catch (error) {
    const response = apiResponse([], res.status, "Error");
    return res.send(response);
  }
});
