/**
 * Resta 2 meses a la fecha actual
 * 
 */
const getLastDate = () =>{
    let lasDate = new Date()
    lasDate.setMonth(lasDate.getMonth() - 3)
    let month = formaterMonth(lasDate.getMonth())
    return {"month" : month,
            "year" : lasDate.getFullYear()}
}

/**
 * Convierte el indice del mes en un mes formateado 0 => '01'
 * @param {*} index 
 */
const formaterMonth = (index) =>{
    let month = (index + 1) 
    return (month < 10) ? String("0" + month) : String(month)
}
module.exports = getLastDate