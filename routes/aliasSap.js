const Router = require('express-promise-router')
const apiResponse = require('../Utils/ApiUtil/apiResponseReducer')
const getConfigAliasSap = require('../Request/aliasSap')
const get = require('../Utils/ApiUtil/http')

const route = new Router();

route.get('/', async (req, res) => {
    try {
        let {email} = req.query;

        console.log("email",email)

        let alias = ""
        switch(email.toLowerCase().trim()){
            case "sadiazg@achs.cl" : 
                alias = "SADIAZG" 
                break;
            case "ciquezadap@achs.cl" : 
                alias = "ciquezadap" 
                break;
            case "ticoncar@achs.cl" : 
                alias = "ticoncar" 
                break; 
            case "mnojvc@achs.cl" : 
                alias = "jvalenzuel" 
                break; 
            case "egampa@achs.cl" : 
                alias = "mparraar" 
                break;   
            case "grmsve@achs.cl" : 
                alias = "svillegas" 
                break;
            case "jvalenzuela@achs.cl" :
                alias="jvalenzuel"
                break;
            case "gabustamantb@ext.achs.cl" :
                alias="SADIAZG"
                break;  
             case "asalvadorn@ext.achs.cl" :
                alias="SADIAZG"
                break; 
             case "tkrikoriam@achs.cl" :
                alias="SADIAZG"
                break;
            case "gmontillar@ext.achs.cl" :
                alias="SADIAZG"
                break;                                               
        }

            const response = apiResponse(alias.toUpperCase().trim(), res.statusCode, "Operacion exitosa")
            res.send(response)
    } catch (error) {
        console.log(error)
        res.send(apiResponse([], 500, error))
    }
})
module.exports = route;