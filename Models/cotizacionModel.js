/**
 * El modelo repesenta  al paciente si es o no afiliado a la ACHS
 * es decir registra cotizacion de hace dos meses atras desde la fecha actual
 * 
 * @param {*} rutPagador 
 * @param {*} nombreEmpresa 
 * @param {*} rutTrabajador 
 * @param {*} isAfiliado 
 */
const getCotizacionModel = (RutPagador,NombreEmpresa,RutTrabajador,IsAfiliado,SucursalEmpresa,DireccionEmpresa,comunaEmpresa,direccionParticular,telefonoParticular) => {
    return {
            NombreEmpresa,
            RutPagador,
            RutTrabajador,
            IsAfiliado,
            SucursalEmpresa, 
            DireccionEmpresa,
            comunaEmpresa,
            direccionParticular,
            telefonoParticular
        }
  }

  module.exports = getCotizacionModel