/**
 * El modelo repesenta  al paciente si es o no afiliado a la ACHS
 * es decir registra cotizacion de hace dos meses atras desde la fecha actual
 * 
 * @param {*} rutPagador 
 * @param {*} nombreEmpresa 
 * @param {*} rutTrabajador 
 * @param {*} isAfiliado 
 */
const getCotizacionModel = (rutPagador,nombreEmpresa,rutTrabajador,isAfiliado) => {
    return {
            "NombreEmpresa" : rutPagador,
            "RutEmpresa" : nombreEmpresa,
            "RutTrabajador" : rutTrabajador,
            "isAfiliado" : isAfiliado,
        }
  }
  module.exports = getCotizacionModel