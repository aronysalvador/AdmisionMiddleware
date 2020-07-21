const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");
const getLastDate = require("../Utils/DateTimeUtil/DateTime");
const getConfigCotizacion = require("../Request/cotizacion");
const http = require("../Utils/ApiUtil/http");
const getCotizacionModel = require("../Models/cotizacionModel");

const route = new Router();

/**
 *  Indica si el trabajador esta afiliado a la ACHS
 *  Se considera afiliados a los trabajadores que poseen cotizaciones 2 meses anteriores al periodo actual
 */
route.get("/isAfiliado", async (req, res) => {
  try {
    let rut = req.query.rut;
    let periodo = getLastDate();

    let json = "";
    await http(
      getConfigCotizacion(rut, `${periodo.year}${periodo.month}`)
    ).then((data) => {
      let sap = data.d.results[0];
      if (data.d.results.length > 0)
        json = getCotizacionModel(
          sap.RUT_Pagador,
          sap.Nombre_Empresa,
          sap.rutTrabajador,
          true
        );
      else json = getCotizacionModel("", "", "", false);
    });
    const response = apiResponse(json, res.statusCode, "Operacion exitosa");
    res.send(response);
  } catch (error) {
    res.send(apiResponse([], 500, error));
  }
});
module.exports = route;
