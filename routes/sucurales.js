const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const {getConfigSucursales} = require('../Request/empresa')
const get = require('../Utils/ApiUtil/http')


const route = new Router();

route.get('/', async (req, res) => {
    try {
        const sucursalResponse = await get(getConfigSucursales(req.query.rutEmpresa))
        const sucursalResult = sucursalResponse.d.results.map(afp => {return{"id": afp._BIC_ZBPARTNER, "codigo": afp.RAZON_SOCIAL, "nombre":afp.DIRECCION}})
        const response = apiResponse(sucursalResult, res.statusCode, "Operacion exitosa")
        res.send(response)
    } catch (error) {
        console.log(error)
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;