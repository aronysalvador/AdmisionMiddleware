const Router = require("express-promise-router");
const { insertarAdmision, getAdmisionByID } = require("../Request/database");
const { httpPost, httpGetRequest } = require("../Utils/ApiUtil/httpRequests");
const mapearAdmisionObjeto = require("../Utils/mapearObjetoAdmision");
const mapearObjetoSiniestro = require("../Utils/mapearObjetoSiniestro");
const sapHttpPost = require("../Utils/sapHttpPost");
const { sleep } = require("../Utils/extraccionData");
const apiResponseReducer = require("../Utils/ApiUtil/apiResponseReducer");
const route = new Router();

route.post("/", async (req, res) => {
  const {
    body,
    body: { admision_json },
  } = req;

  //Insertar admision
  const { data: insertaAdmision } = await httpPost(insertarAdmision(), body);
  const { id: admisionID } = insertaAdmision.content[0];

  //Mapear objeto admision
  const admisionToSAP = mapearAdmisionObjeto(admisionID, admision_json);

  //Enviar admision a SAP
  const resultAdmision = await sapHttpPost(
    process.env.URL_SAP_ADMISION,
    admisionToSAP
  );

  let intento = 0;

  while (true) {
    if (intento > 3) return res.status(500);

    const datos = await httpGetRequest(getAdmisionByID(admisionID));
    const { id_estado: id_estadoAdmision } = datos.content[0];
    if (id_estadoAdmision === 3) break;

    await sleep(1500); //segundo y medio
    ++intento;
  }

  const getEpisodioID = await httpGetRequest(getAdmisionByID(admisionID));
  const { descripcion: EpisodioID } = getEpisodioID.content[0];

  //Flujo siniestro
  const { data: insertaSiniestro } = await httpPost(insertarAdmision(), {
    id_tipo: 2,
    id_estado: 2,
  });
  const { id: siniestroid } = insertaSiniestro.content[0];

  const siniestroToSAP = mapearObjetoSiniestro(
    siniestroid,
    EpisodioID,
    admision_json
  );

  const siniestroSAPResponse = await sapHttpPost(
    process.env.URL_SAP_SINIESTRO,
    siniestroToSAP
  );
  let intento2 = 0;

  while (true) {
    if (intento2 > 3) return res.status(500);

    const getSiniestroByID = await httpGetRequest(getAdmisionByID(siniestroid));
    const { id_estado: id_estadoSiniestro } = getSiniestroByID.content[0];
    if (id_estadoSiniestro === 3) break;

    await sleep(1500); //segundo y medio
    ++intento2;
  }

  const numeroSiniestro = await httpGetRequest(getAdmisionByID(siniestroid));
  const { descripcion: siniestroID } = numeroSiniestro.content[0];
  return res.send(
    apiResponseReducer([{ siniestroID }], 200, "Operación Exitosa")
  );
});

module.exports = route;
