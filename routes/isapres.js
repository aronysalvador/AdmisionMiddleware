const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");
const isapresRequest = require("../Request/isapres");
const http = require("../Utils/ApiUtil/http");

const route = new Router();

/**
 * Devuelve la lista de isapres en chile
 */

route.get("/", async (req, res) => {
  try {
    const result = await http(isapresRequest());
    const formated = [];
    if (result.length > 0) {
      formated = result.map((x) => {
        return {
          id: x.key,
          nombre: x.value,
        };
      });
    }
    const response = apiResponse(formated, res.status, "Operacion exitosa");
    return res.send(response);
  } catch (error) {
    const response = apiResponse([], res.status, "Error");
    return res.send(response);
  }
});
module.exports = route;
