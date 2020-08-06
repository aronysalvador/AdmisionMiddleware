 const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getLastDate = require('../Utils/DateTimeUtil/DateTime')
const getConfigCotizacion = require('../Request/cotizacion')
const getConfigPaciente = require('../Request/paciente')
const {getConfigEmpresa,getConfigVigencia,getConfigSucursales} = require('../Request/empresa')
const get = require('../Utils/ApiUtil/http')
const getCotizacionModel = require('../Models/cotizacionModel')
const getConfigSinietsro = require('../Request/sinietsro')

const route = new Router();

const isOk = (array) =>{
    return (Array.isArray(array) && array.length > 0)
}
const getResultSap = (response) =>{
    if(response !== null && response.d !== null && Array.isArray(response.d.results)){
        return response.d.results
    }
    return []
}   

/**
 *  Recupera información del paciente, indicando si el trabajador esta afiliado a la ACHS
 *  Se considera afiliados a los trabajadores que poseen cotizaciones 2 meses anteriores al periodo actual
 */
route.get('/isAfiliado', async (req, res) => {
    try {
        const rut = req.query.rut
        const {year, month} = getLastDate()
        const cotizacion = await get(getConfigCotizacion(rut,`${year}${month}`))

        let RUT_Pagador = "",Nombre_Empresa="",direccionParticular="",telefonoParticular="", isAfiliado = false, rutTrabajador = rut, sucursalEmpresa = "", direccionEmpresa="", comunaEmpresa=""

        if(isOk(getResultSap(cotizacion))){
            RUT_Pagador = getResultSap(cotizacion)[0].RUT_Pagador
            const vigencia = await get(getConfigVigencia(RUT_Pagador))
            const resulstVigencia = getResultSap(vigencia)
            if(isOk(resulstVigencia)){
                isAfiliado = (resulstVigencia[0].ESTATUS_EMPRESA === 'VIGENTE')? true : false
                Nombre_Empresa = resulstVigencia[0].RAZON_SOCIAL
            }
        }
            const sucursales = await get(getConfigSucursales(RUT_Pagador))
            const resulstSucursales = getResultSap(sucursales)
            
            if(isOk(resulstSucursales)){
                sucursalEmpresa = resulstSucursales[0].RAZON_SOCIAL
                direccionEmpresa = resulstSucursales[0].DIRECCION
                comunaEmpresa = ""
            }
            const {direcciones,telefonos}  = await get(getConfigPaciente(rut))
            direccionParticular = (Array.isArray(direcciones) && direcciones.length > 0) ? `${direcciones[0].calle} ${direcciones[0].numero}, ${direcciones[0].comuna}` : null
            telefonoParticular = (Array.isArray(telefonos) && telefonos.length > 0) ? telefonos[(telefonos.length - 1)].numeroTelefonico  : ""
            json = getCotizacionModel(RUT_Pagador,Nombre_Empresa,rutTrabajador,isAfiliado,sucursalEmpresa,direccionEmpresa,comunaEmpresa,direccionParticular,telefonoParticular)
                
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