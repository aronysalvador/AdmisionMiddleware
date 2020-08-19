const Router = require("express-promise-router");
const apiResponse = require("../Utils/ApiUtil/apiResponseObjectReducer");
const  {getNivel1,getNivel2,getNivel3} = require('../Request/alertas')
const get = require('../Utils/ApiUtil/http')

const route = new Router();

route.get("/", async (req, res) => {
    try {
      
      //obtenemos los niveles
      const responseN1 = await get(getNivel1())
      const responseN2 = await get(getNivel2())
      const responseN3 = await get(getNivel3())
      
      //creamos la estructura
      const option3 = getStructure(responseN3,[], 0)
      const option2 = getStructure(responseN2,option3, 1)
      const structure = getStructure(responseN1,option2, 1)
      
      //resultado
      res.send(apiResponse(structure,200,"Operación Exitosa"))

    } catch (error) {
      res.send(apiResponse([], 500, error))
   }
});

const getStructure = (data,childData,key) => {
  const estructura = data.map(reg => {
    let opciones = []
    
    if(reg.key === key)
      opciones = childData

    return {"id": reg.key, "glosa": reg.value, "opciones": opciones}
  })

  return estructura
}

module.exports = route;
