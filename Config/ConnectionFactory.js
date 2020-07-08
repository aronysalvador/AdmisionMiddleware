/**
 * Implementa el patron factory para devolver instancias del pool de conexiones 
 * cada vez que se invoca el metodo
 */

const cn = require('./DatabaseConfig')
const { Pool } = require('pg')

const pool = new Pool(cn)

/**
 * Exporta un objeto con una propiedad "query", que contiene una función
 * que permite ejecutar queries sobre el objeto pool de conexiones de postgres
 * recibe como parametros 
 * text: Consulta SQL en texto plano
 * parameters: Array con parametros para la query
 */
module.exports = {
    query: (text, parameters) => pool.query(text, parameters)
}