/**
 * Objeto con los parametros de conexión a la base de datos, en producción estos valores deben
 * ser reemplazados por variables de entorno almacendas en el servidor.
 */
const pg_node = {
    user: '',
    host: '',
    database: '',
    password: '',
    port: 0,
}

module.exports = pg_node
