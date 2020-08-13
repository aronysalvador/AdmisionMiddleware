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

const afps = require("./routes/afps");
const ocupaciones = require("./routes/ocupaciones");
const regiones = require("./routes/regiones");
const comunas = require("./routes/comunas");
const tipoContrato = require("./routes/tipoContrato");
const jornadaTrabajo = require("./routes/jornadaTrabajo");
const tipoRemuneracion = require("./routes/tipoRemuneracion");
const categoriaOcupacional = require("./routes/categoriaOcupacional");
const sucursales = require("./routes/sucurales");
const profesiones = require("./routes/profesiones");
const alertas = require("./routes/alertas");
const app = express();

var cors = require("cors");

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/api/patient", patient);
app.use("/api/isapres", isapres);

app.use("/api/ocupaciones", ocupaciones);
app.use("/api/regiones", regiones);
app.use("/api/comunas", comunas);
app.use("/api/afp", afps);
app.use("/api/sucursales", sucursales);
app.use("/api/tipoContrato", tipoContrato);
app.use("/api/jornadaTrabajo", jornadaTrabajo);
app.use("/api/tipoRemuneracion", tipoRemuneracion);
app.use("/api/categoriaOcupacional", categoriaOcupacional);
app.use("/api/profesiones", profesiones);
app.use("/api/alertas", alertas);

const port = 80;
app.listen(port, () => {
  console.log(`Listen on port ${port}`);
});
