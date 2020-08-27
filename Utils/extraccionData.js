const comunas = require("./comunas.json");

function extraerNumeroDireccion(direccionParticular) {
  if (direccionParticular) {
    let numberPattern = /\d+/g;
    const result = direccionParticular.match(numberPattern);
    return result ? result[0] : "";
  }
  return "";
}
function extraerDatosDireccion(direccion) {
  if (direccion) {
    const direccionSiniestro = direccion.map((x) => x.value);

    return {
      calle: direccionSiniestro[0],
      numero: direccionSiniestro[1],
      comuna: direccionSiniestro[2],
    };
  }
  return "";
}

function extraerRegionDireccion(comuna) {
  if (comuna) {
    const { codigo_region } = comunas.find(
      (x) => x.nombre === comuna.trim().toUpperCase()
    );
    console.log({ codigo_region });
    return codigo_region;
  }
}

/**
 * Formatea una fecha en formato ISO a dd.mm.yyyy
 * @param {*} fecha
 */
function formatearFecha(fecha) {
  if (fecha) {
    const fechaInput = fecha.split("T");
    return fechaInput[0].split("-").reverse().join(".");
  }
  return "";
}

function formatearTelefono(telefono) {
  if (telefono) {
    const telefonoNoSpace = telefono.trim().replace(/\s/g, "");
    const telefonoSAP = telefonoNoSpace.substring(telefonoNoSpace.length, 3);
    return telefonoSAP;
  }
  return "";
}

function formatearFechaSiniestro(fechaHoraSiniestro) {
  const { days, month, year } = fechaHoraSiniestro;
  const fechaHora = `${days}.${
    parseInt(month) < 10 ? "0" + month : month
  }.${year}`;
  return fechaHora;
}

function formatearHoraSiniestro(fechaHoraSiniestro) {
  const { horas, minutos } = fechaHoraSiniestro;
  const horaSiniestro = `${horas < 10 ? `0${String(horas)}` : String(horas)}:${
    minutos === 0
      ? "00".trim()
      : minutos < 10
      ? ("0" + String(minutos)).trim()
      : String(minutos).trim()
  }:00`;
  return horaSiniestro;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = {
  extraerNumeroDireccion,
  extraerRegionDireccion,
  formatearFecha,
  formatearTelefono,
  formatearFechaSiniestro,
  formatearHoraSiniestro,
  extraerDatosDireccion,
  sleep,
};
