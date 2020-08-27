const Router = require("express-promise-router");
const { insertarAdmision, getAdmisionByID } = require("../Request/database");
const { httpPost } = require("../Utils/ApiUtil/httpRequests");
const mapearAdmisionObjeto = require("../Utils/mapearObjetoAdmision");
const mapearObjetoSiniestro = require("../Utils/mapearObjetoSiniestro");
const route = new Router();

route.post("/", async (req, res) => {
  const {
    body,
    body: { admision_json },
  } = req;

  // const { data: insertaAdmision } = await httpPost(insertarAdmision(), body);
  // const { id: admisionID } = insertaAdmision.content[0];

  // const admisionToSAP = mapearAdmisionObjeto(admisionID, admision_json);
  const siniestroToSAP = mapearObjetoSiniestro(
    92,
    "00065656556",
    admision_json
  );

  return res.send(siniestroToSAP);
});

module.exports = route;
