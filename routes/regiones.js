const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getConfigRegiones = require('../Request/regiones')
const get = require('../Utils/ApiUtil/http')


const route = new Router();

route.get('/', async (req, res) => {
    try {
        const regionesResponse = await get(getConfigRegiones())
        const regionesResult = regionesResponse.d.results.map(region => {return{"id": region.Key_Regiones, "codigo": region.COD_REGION, "nombre":region.TEXTO_REGION}})
        const response = apiResponse(regionesResult, res.statusCode, "Operacion exitosa")
        res.send(response)
    } catch (error) {
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;