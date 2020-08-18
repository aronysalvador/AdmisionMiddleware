const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseObjectReducer");
const getLastDate = require("../Utils/DateTimeUtil/DateTime");
const getConfigCotizacion = require("../Request/cotizacion");
const getConfigPaciente = require("../Request/paciente");
const {
  getConfigEmpresa,
  getConfigVigencia,
  getConfigSucursales,
} = require("../Request/empresa");
const get = require("../Utils/ApiUtil/http");
const getCotizacionModel = require("../Models/cotizacionModel");
const getConfigSinietsro = require("../Request/sinietsro");
const getConfigCitasFuturas = require("../Request/citas");

const route = new Router();

const isOk = (array) => {
  return Array.isArray(array) && array.length > 0;
};
const getResultSap = (response) => {
  if (
    response !== null &&
    response.d !== null &&
    Array.isArray(response.d.results)
  ) {
    return response.d.results;
  }
  return [];
};

/**
 *  Recupera información del paciente, indicando si el trabajador esta afiliado a la ACHS
 *  Se considera afiliados a los trabajadores que poseen cotizaciones 2 meses anteriores al periodo actual
 */
route.get("/isAfiliado", async (req, res) => {
  try {
    const rut = req.query.rut.toUpperCase();
    const { year, month } = getLastDate();
    const cotizacion = await get(getConfigCotizacion(rut, `${year}${month}`));

    let RUT_Pagador = "",
      Nombre_Empresa = "",
      direccionParticular = "",
      telefonoParticular = "",
      isAfiliado = false,
      rutTrabajador = rut,
      sucursalEmpresa = "",
      direccionEmpresa = "",
      comunaEmpresa = "",
      BpCreado = false;

    const {
      direcciones,
      telefonos,
      numeroBP,
      apellidoMaterno,
      apellidoPaterno,
      nombre,
      fechaNacimiento,
      masculino,
      femenino,
      nacionalidad,
      lugarNacimiento,
      estadoCivil,
      direcciones: { direccionParticular2 },
    } = await get(getConfigPaciente(rut));
    BpCreado = typeof numeroBP != "undefined";

    if (isOk(getResultSap(cotizacion))) {
      RUT_Pagador = getResultSap(cotizacion)[0].RUT_Pagador;
      const vigencia = await get(getConfigVigencia(RUT_Pagador));
      const resulstVigencia = getResultSap(vigencia);

      if (isOk(resulstVigencia)) {
        const { ESTATUS_EMPRESA } = resulstVigencia[0];
        isAfiliado = ESTATUS_EMPRESA === "VIGENTE" ? true : false;
        const resulstSucursales = await get(getConfigSucursales(RUT_Pagador));
        if (isOk(resulstSucursales)) {
          for (let i = 0; i < resulstSucursales.length; i++) {
            const {
              Cod_Comuna,
              Razon_Social,
              Direccion,
              Comuna,
            } = resulstSucursales[i];
            const { codigoComuna } = direcciones[0];
            if (Cod_Comuna == codigoComuna) {
              sucursalEmpresa = Razon_Social;
              direccionEmpresa = Direccion;
              comunaEmpresa = Comuna;
              Nombre_Empresa = Razon_Social;
            }
          }
        }
      }
    }

    let siniestros = await get(getConfigSinietsro(numeroBP));
    let citas = await get(getConfigCitasFuturas(numeroBP));
    const isDireccion = Array.isArray(direcciones) && direcciones.length > 0;

    if (isOk(direcciones)) {
      const { calle, numero, comuna } = direcciones[0];
      direccionParticular = isDireccion
        ? `${calle} ${numero}, ${comuna}`
        : null;
    }

    const isTelefono = Array.isArray(telefonos) && telefonos.length > 0;
    telefonoParticular = isTelefono
      ? telefonos[telefonos.length - 1].numeroTelefonico
      : "";
    json = getCotizacionModel(
      RUT_Pagador,
      Nombre_Empresa,
      rutTrabajador,
      isAfiliado,
      sucursalEmpresa,
      direccionEmpresa,
      comunaEmpresa,
      direccionParticular,
      telefonoParticular,
      citas,
      siniestros,
      BpCreado,
      apellidoMaterno,
      apellidoPaterno,
      nombre,
      fechaNacimiento,
      masculino,
      femenino,
      nacionalidad,
      lugarNacimiento,
      estadoCivil,
      direccionParticular2
    );
    const response = apiResponse(json, res.statusCode, "Operacion exitosa");
    res.send(response);
  } catch (error) {
    res.send(apiResponse(error, 500, error));
  }
});

module.exports = route;
