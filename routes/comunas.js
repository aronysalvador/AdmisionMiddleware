const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getConfigComunas = require('../Request/comunas')
const get = require('../Utils/ApiUtil/http')


const route = new Router();

route.get('/', async (req, res) => {
    try {
        const comunasResponse = await get(getConfigComunas())
        const comunasResult = comunasResponse.d.results.map(comuna => {return{"id": comuna.Key_Comunas, "codigo": comuna.COD_COMUNA, "nombre":comuna.TEXTO_COMUNA}})
        const response = apiResponse(comunasResult, res.statusCode, "Operacion exitosa")
        res.send(response)
    } catch (error) {
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;