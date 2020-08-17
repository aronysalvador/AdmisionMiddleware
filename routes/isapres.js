const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getIsapres = require('../Request/isapres')
const get = require('../Utils/ApiUtil/http')


const route = new Router();

route.get('/', async (req, res) => {
    try {
        const isapresResponse = await get(getIsapres())
        const isapresResult = isapresResponse.map(isapres => {return{"id": isapres.key, "nombre":isapres.value}})
        const response = apiResponse(isapresResult, res.statusCode, "Operacion exitosa")
        res.send(response)
    } catch (error) {
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;