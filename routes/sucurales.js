const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseReducer");
const { getConfigSucursalesVigentes } = require("../Request/empresa");
const get = require("../Utils/ApiUtil/http");

const route = new Router();

route.get("/", async (req, res) => {
  try {
    const rutEmpresaFormateado = req.query.rutEmpresa.replace(/\./g, "");
    const sucursalResponse = await get(
      getConfigSucursalesVigentes(rutEmpresaFormateado)
    );
    const sucursalResult = sucursalResponse.map((afp) => {
      return {
        sucursalCargo: afp.sede,
        codigo: afp.idSucursal,
        nombre: "",
        id_comuna: afp.comuna.idComuna.toString().substring(9, 12),
        comuna: afp.comuna.descripcionComuna,
        codigo_region: afp.region.idRegion,
        region: afp.region.descripcionRegion,
        direccion: afp.nombreCalle + afp.numero,
      };
    });
    res.send(sucursalResult);
  } catch (error) {
    console.log(error);
    res.send(apiResponse([], 500, error));
  }
});
module.exports = route;
