/**
 * Carga del SDK Azure Application Insights para NodeJS, por seguridad la instrumentation key
 * debe estar guardada en una variable de entorno en el servidor
 */
const appInsights = require("applicationinsights");
appInsights.setup("your_instrmentation_key").start();
const express = require("express");
const morgan = require("morgan");
const patient = require("./routes/patient");
const isapres = require("./routes/isapres");
const cargos = require("./routes/cargos");
const regiones = require("./routes/regiones");
const comunas = require("./routes/comunas");

const app = express();

var cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/patient", patient);
app.use("/api/isapres", isapres);
app.use("/api/cargos", cargos);
app.use("/api/regiones", regiones);
app.use("/api/comunas", comunas);
const port = 80;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
