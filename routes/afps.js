const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getConfigAFP = require('../Request/afps')
const get = require('../Utils/ApiUtil/http')


const route = new Router();

route.get('/', async (req, res) => {
    try {
        const afpsResponse = await get(getConfigAFP())
        const afpResult = afpsResponse.d.results.map(afp => {return{"id": afp.Key_Afp, "codigo": afp.COD_AFP, "nombre":afp.TEXTO_AFP}})
        const response = apiResponse(afpResult, res.statusCode, "Operacion exitosa")
        res.send(response)
    } catch (error) {
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;