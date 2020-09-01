const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getConfigAliasSap = require('../Request/aliasSap')
const get = require('../Utils/ApiUtil/http')

const route = new Router();

route.get('/', async (req, res) => {
    try {
        let {email} = req.query;
        const nick = email.toString().split("@")[0]
        const aliasResponse = await get(getConfigAliasSap(nick))
        const {Aliases} = aliasResponse
        if(!Array.isArray(Aliases)){
            res.send(apiResponse([], 501, "No se encontró alias SAP"))
        }else{
            let alias = ""
            if(Aliases.length > 1){
                alias = Aliases[1].toString().toUpperCase()
            }else{
                alias = Aliases[0].toString().toUpperCase()
            }
            const response = apiResponse(alias, res.statusCode, "Operacion exitosa")
            res.send(response)
        }
    } catch (error) {
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;