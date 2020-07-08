/**
 * Carga del SDK Azure Application Insights para NodeJS, por seguridad la instrumentation key
 * debe estar guardada en una variable de entorno en el servidor
 */
const appInsights = require("applicationinsights");
appInsights.setup('your_instrmentation_key').start()
const express = require('express')
const morgan = require('morgan')
const patient = require('./routes/patient')

const app = express()

app.use(express.json())
app.use(morgan('dev')) 
app.use('/api/patient', patient) 

const port = 3000;
app.listen(port, () => { console.log(`Listen on port ${port}`) })
