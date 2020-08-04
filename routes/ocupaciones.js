const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getConfigOcupaciones = require('../Request/ocupacion')
const get = require('../Utils/ApiUtil/http')


const route = new Router();

route.get('/', async (req, res) => {
    try {
        const ocupResponse = await get(getConfigOcupaciones())
        const ocupaResult = ocupResponse.d.results.map(ocupacion => {return{"id": ocupacion.Key_Ocupacion, "codigo": ocupacion.COD_PROFESION, "nombre":ocupacion.TEXTO_PROFESION}})
        const response = apiResponse(ocupaResult, res.statusCode, "Operacion exitosa")
        res.send(response)
    } catch (error) {
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;