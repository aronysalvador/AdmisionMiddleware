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
            BpCreado : false,
            NombreEmpresa,
            RutPagador,
            RutTrabajador,
            IsAfiliado,
            SucursalEmpresa, 
            DireccionEmpresa,
            comunaEmpresa,
            direccionParticular,
            telefonoParticular,
            citas : [
                {
                  fecha: '10-08-2020 17:00',  //RESTRUCTURAR
                  lugar: 'Puente Alto',
                  unidad: 'Cirugía'
                },
                {
                  fecha: '08-08-2020 13:00',
                  lugar: 'Providencia',
                  unidad: 'Dermatología'
                }
              ],
              siniestros: [
                {
                  id: 24457874,
                  descripcion: 'Trabajo',
                  fecha: '13 Jun 2020',
                  CUN: 'CUN',
                  codigoUnicoNacionalExterno: 'CUNE',
                  cesa: 'CeSa',
                  interLComercial: 'InterLComercial',
                  tipoLey: 'Tipo Ley',
                  reposoActivo: true,
                  hora: '18:23'
                },
                {
                  id: 24457874,
                  descripcion: 'Trabajo',
                  fecha: '13 Jun 2020',
                  CUN: 'CUN',
                  codigoUnicoNacionalExterno: 'CUNE',
                  cesa: 'CeSa',
                  interLComercial: 'InterLComercial',
                  tipoLey: 'Tipo Ley',
                  reposoActivo: true,
                  hora: '18:23'
                },
                {
                  id: 24457874,
                  descripcion: 'Trabajo',
                  fecha: '13 Jun 2020',
                  CUN: 'CUN',
                  codigoUnicoNacionalExterno: 'CUNE',
                  cesa: 'CeSa',
                  interLComercial: 'InterLComercial',
                  tipoLey: 'Tipo Ley',
                  reposoActivo: true,
                  hora: '18:23'
                },

              ]
        }
  }

  module.exports = getCotizacionModel