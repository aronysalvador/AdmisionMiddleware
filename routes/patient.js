 const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getLastDate = require('../Utils/DateTimeUtil/DateTime')
const getConfigCotizacion = require('../Request/cotizacion')
const getConfigPaciente = require('../Request/paciente')
const {getConfigEmpresa,getConfigVigencia} = require('../Request/empresa')
const get = require('../Utils/ApiUtil/http')
const getCotizacionModel = require('../Models/cotizacionModel')


const route = new Router();

/**
 *  Recupera información del paciente, indicando si el trabajador esta afiliado a la ACHS
 *  Se considera afiliados a los trabajadores que poseen cotizaciones 2 meses anteriores al periodo actual
 */
route.get('/isAfiliado', async (req, res) => {
    try {
        //Recuperamos el RUT
        const rut = req.query.rut
        //Obtenemos el periodo anterior (2 meses atras)
        const {year, month} = getLastDate()
        //Obtenemos las cotizaciones desde SAP
        const contizacionResponse = await get(getConfigCotizacion(rut,`${year}${month}`))
        const cotizacion = contizacionResponse.d.results
        let RUT_Pagador = "",Nombre_Empresa="",rutTrabajador="",_BIC_ZBP_SEDE="", isAfiliado = false
        if(Array.isArray(cotizacion) && cotizacion.length > 0){
            RUT_Pagador = cotizacion[0].RUT_Pagador
            Nombre_Empresa = cotizacion[0].Nombre_Empresa
            rutTrabajador = cotizacion[0].rutTrabajador
            _BIC_ZBP_SEDE = cotizacion[0]._BIC_ZBP_SEDE
        }
        let json = ""
        if(cotizacion.length > 0) {
            //Obtenemos los datos del paciente
            const {direcciones,telefonos}  = await get(getConfigPaciente(rut))
            const direccionParticular = (Array.isArray(direcciones) && direcciones.length > 0) ? `${direcciones[0].calle} ${direcciones[0].numero}, ${direcciones[0].comuna}` : null
            const telefonoParticular = (Array.isArray(telefonos) && telefonos.length > 0) ? telefonos[(telefonos.length - 1)].numeroTelefonico  : ""
            
            //Obtenemos la sucursal de la empresa
            //const {nombreOrganizacion2,direcciones} = await get(getConfigEmpresa(_BIC_ZBP_SEDE))
            const empresa = await get(getConfigEmpresa(_BIC_ZBP_SEDE))
            let direccionEmpresa = "", comunaEmpresa = "", sucursalEmpresa = ""
            if(empresa !== null){
                //Se  revisara API con Fred la api demora mas 5 minutos en responder
                const vigencia = await get(getConfigVigencia(empresa.rut))
                //la api esta fallando
                //isAfiliado = (vigencia.d.results[0].ESTATUS_EMPRESA === 'VIGENTE')? true : false
                isAfiliado = true
                
                const direccionesEmpresa = empresa.direcciones
                if(Array.isArray(direccionesEmpresa) && direccionesEmpresa.length > 0){
                    const index = direccionesEmpresa.length -1
                    direccionEmpresa = `${direccionesEmpresa[index].calle} ${direccionesEmpresa[index].numero}`
                    comunaEmpresa = empresa.nombreOrganizacion2
                    sucursalEmpresa = empresa.nombreOrganizacion2
                }
            }
            json = getCotizacionModel(RUT_Pagador,Nombre_Empresa,rutTrabajador,isAfiliado,sucursalEmpresa,direccionEmpresa,comunaEmpresa,direccionParticular,telefonoParticular)
        }
        else{
            json = getCotizacionModel("","","",false,"","","","","")
        }
        const response = apiResponse(json, res.statusCode, "Operacion exitosa")
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(apiResponse([], 500, error))
    }
})

const getDireccion = () =>{
    
}
module.exports = route;