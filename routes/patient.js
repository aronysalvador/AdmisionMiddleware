const Router = require("express-promise-router")
const apiResponse = require("../Utils/ApiUtil/apiResponseObjectReducer")
const getLastDate = require("../Utils/DateTimeUtil/DateTime")
const getConfigCotizacion = require("../Request/cotizacion")
const getConfigPaciente = require("../Request/paciente")
const {
  getConfigEmpresa,
  getConfigVigencia,
  getConfigSucursalesVigentes,
} = require("../Request/empresa")
const get = require("../Utils/ApiUtil/http")
const getCotizacionModel = require("../Models/cotizacionModel")
const getConfigSinietsro = require("../Request/sinietsro")
const getConfigCitasFuturas = require("../Request/citas")
const {getDate,getHora,getDateObj} = require("../Utils/DateUtil")

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

route.get('/validate', async (req, res) => {
  try {
    let {rutEmpresa, BpSucursal, rutPaciente} = req.query;
    let Empresa = "NoAfiliada", Sucursal = "NoVigente", CotizacionesPaciente = false
    rutEmpresa = (typeof rutEmpresa === 'string')? rutEmpresa.toUpperCase() : ""
    //validar empresa
    const vigenciaEmpresa = await get(getConfigVigencia(rutEmpresa))
    const vigenciaEmpresaFormateada = getResultSap(vigenciaEmpresa)
    const {ESTATUS_EMPRESA} = vigenciaEmpresaFormateada[0]
    if(ESTATUS_EMPRESA === 'VIGENTE')
      Empresa = "Afiliada" 
    //Obtener sucursales vigentes
    const sucursalesVigentes = await get(getConfigSucursalesVigentes(rutEmpresa))
    const sucursalVigente = sucursalesVigentes.find(({idSucursal}) => idSucursal == BpSucursal);
    if(typeof sucursalVigente === 'object')
      Sucursal = "Vigente"
    //Validar las cotizaciones
    const { year, month } = getLastDate();
    const cotizacion = await get(getConfigCotizacion(rutPaciente, `${year}${month}`));
    if (isOk(getResultSap(cotizacion))) {
      const RUT_Pagador = getResultSap(cotizacion)[0].RUT_Pagador;
      if(RUT_Pagador === rutEmpresa)
        CotizacionesPaciente = true
    }
    const json = {Empresa, Sucursal, CotizacionesPaciente}
    const response = apiResponse(json, res.statusCode, "Operacion exitosa");
    res.send(response);
  } catch (error) {
      console.log(error)
      res.send(apiResponse([], 500, error))
  }
})


route.get("/getPaciente", async (req, res) => {
  try {

    const rut = req.query.rut.toUpperCase();
    const { year, month } = getLastDate();
    const cotizacion = await get(getConfigCotizacion(rut, `${year}${month}`));

    let RUT_Pagador = "",
      Nombre_Empresa = "",
      direccionParticular = "",
      telefonoParticular = "",
      rutTrabajador = rut,
      sucursalEmpresa = "",
      direccionEmpresa = "",
      comunaEmpresa = "",
      BpCreado = false;

    const respuesta = await get(getConfigPaciente(rut));

    const {
      DIRECCION,TELEFONO,BP,APELLIDO_MATERNO,APELLIDO_PATERNO,NOMBRES,FECHA_NACIMIENTO,GENERO, COMUNA, PAIS, NACIONALIDAD, ESTADO_CIVIL
    } = respuesta[0]

    BpCreado = typeof BP != "undefined";

    if (isOk(getResultSap(cotizacion))) {
      RUT_Pagador = getResultSap(cotizacion)[0].RUT_Pagador;
    }

    let siniestrosResponse = await get(getConfigSinietsro(BP));

    const siniestros = siniestrosResponse.map(s => {return{"id": s.Id_Siniestro, "descripcion": s.DescSiniestro, "fecha": getDate(s.FechaPresentacion), "fecha_date" : getDateObj(s.FechaPresentacion),
                                                  "CUN": s.CodigoUnicoNacionalExerno,"codigoUnicoNacionalExterno": s.CodigoUnicoNacionalExerno,"cesa":s.CeSanitario, "interLComercial" : s.InterlComercial, 
                                                  "tipoLey": s.DescTipoLey, "reposoActivo": s.ReposoActivo, "hora": getHora(s.HoraPresentacion),"paciente":s.NombreDenunciante}})                                         

    let citasResponse = await get(getConfigCitasFuturas(BP));
    let cita = {}
    if(Array.isArray(citasResponse) && citasResponse.length > 0){
      let {FECHA_CITA,HORA_CITA,LUGAR_CONSULTA,TIPO_ATENCION} = citasResponse[citasResponse.length - 1]
      cita = {"fecha": FECHA_CITA,"hora": HORA_CITA,"lugar": LUGAR_CONSULTA,"unidad": TIPO_ATENCION}
    } 

    direccionParticular = `${DIRECCION}, ${COMUNA}`

    if(!TELEFONO){
      telefonoParticular = ""
    }else{
      
      telefonoParticular = TELEFONO.substring(5,TELEFONO.length -1)
      if (telefonoParticular.length !== 9){
        telefonoParticular = ""
      }
    }

    if(GENERO.toUpperCase() === "MASCULINO"){
      masculino="X";
      femenino=""

    }else{
      masculino="";
      femenino="X"
    }

    nacionalidad = NACIONALIDAD;
    lugarNacimiento = PAIS;
    estadoCivil = ESTADO_CIVIL

    json = getCotizacionModel(
      RUT_Pagador,
      Nombre_Empresa,
      rutTrabajador,
      sucursalEmpresa,
      direccionEmpresa,
      comunaEmpresa,
      direccionParticular,
      telefonoParticular,
      cita,
      siniestros,
      BpCreado,
      APELLIDO_MATERNO,
      APELLIDO_PATERNO,
      NOMBRES,
      FECHA_NACIMIENTO,
      masculino,
      femenino,
      nacionalidad,
      lugarNacimiento,
      estadoCivil
    );
    const response = apiResponse(json, res.statusCode, "Operacion exitosa");
    res.send(response);
  } catch (error) {
    console.log(error)
    res.send(apiResponse(error, 500, error));
  }
});

module.exports = route;
