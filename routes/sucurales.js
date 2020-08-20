const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const {getConfigSucursales} = require('../Request/empresa')
const get = require('../Utils/ApiUtil/http')


const route = new Router();

route.get('/', async (req, res) => {
    try {
        const sucursalResponse = await get(getConfigSucursales(req.query.rutEmpresa))
        const sucursalResult = sucursalResponse.map(afp => {return{ "codigo": afp.BPEmpresa, 
                                                                    "nombre":afp.Razon_Social,
                                                                    "id_comuna" : afp.Cod_Comuna.substring(9,12),
                                                                    "codigo_region" : afp.Cod_Comuna.substring(7,9),
                                                                    "direccion" : afp.Direccion}})
        res.send(sucursalResult)
    } catch (error) {
        console.log(error)
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;