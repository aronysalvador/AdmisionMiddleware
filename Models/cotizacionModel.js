/**
 * El modelo repesenta  al paciente si es o no afiliado a la ACHS
 * es decir registra cotizacion de hace dos meses atras desde la fecha actual
 *
 * @param {*} rutPagador
 * @param {*} nombreEmpresa
 * @param {*} rutTrabajador
 */
const getCotizacionModel = (
  RutPagador,
  NombreEmpresa,
  RutTrabajador,
  SucursalEmpresa,
  DireccionEmpresa,
  comunaEmpresa,
  direccionParticular,
  telefonoParticular,
  cita,
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
  codigoComuna
) => {
  return {
    BpCreado,
    NombreEmpresa,
    RutPagador,
    RutTrabajador,
    SucursalEmpresa,
    DireccionEmpresa,
    comunaEmpresa,
    direccionParticular,
    telefonoParticular,
    cita,
    siniestros,
    apellidoMaterno,
    apellidoPaterno,
    nombre,
    fechaNacimiento,
    masculino,
    femenino,
    nacionalidad,
    lugarNacimiento,
    estadoCivil,
    codigoComuna,
  };
};

module.exports = getCotizacionModel;
