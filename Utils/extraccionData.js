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

/**
 * Formatear fecha y hora responsable
 * @param {*} fechaHoraResponsable
 */
function formatearFechaHoraResponsable(fechaHoraResponsable) {
  const { days, month, year, horas, minutos } = fechaHoraResponsable;
  const fechaResponsable = `${days < 10 ? `0${String(days)}` : String(days)}.${
    month < 10 ? `0${String(month)}` : String(month)
  }.${String(year)}`;
  const horaResponsable = `${horas < 10 ? `0${String(horas)}` : horas}:${
    minutos < 10 ? `0${String(minutos)}` : String(minutos)
  }:00`;

  return { fechaResponsable, horaResponsable };
}

function concatenarRelatoToSAP(
  relato,
  testigo,
  responsable,
  fechaHoraResponsable
) {
  //"Resumen relato" + la información de testigo  + la información de responsable
  let datosTestigo = "";
  let datosResponsable = "";

  const { fechaResponsable, horaResponsable } = formatearFechaHoraResponsable(
    fechaHoraResponsable
  );

  //Sí tiene testigos
  if (Object.keys(testigo))
    datosTestigo = `Tiene testigos de su accidente, el nombre y el cargo es ${testigo.nombre} ${testigo.cargo}`;
  else datosTestigo = "No tiene testigos de su accidente";

  //Sí tiene responsables
  if (Object.keys(responsable))
    datosResponsable = `Avisó a la empresa, el nombre y cargo (relación) de la persona es ${responsable.nombre}, ${responsable.cargo}, fecha y hora en que aviso a su empresa sobre el accidente: ${fechaResponsable} a las ${horaResponsable}`;
  else datosResponsable = "No avisó a su empresa";

  const relatoCompleto = `${relato}, ${datosTestigo}, ${datosResponsable}`;
  return relatoCompleto;
}

//Mapear el parametro dependencia en SAP
function mapearCategoriaOcupacional({ id }) {
  return (id === 2) | (id === 4) | (id === 5) ? "1" : "2";
}

//Obtener nombre las UM y UT, campos Unidad_organizativa y Unidad_Org_medica
function mappingCamposUTMUT({ CentroData }) {
  const UT = CentroData.find((x) => x.OBJCAT === "UT");
  const UM = CentroData.find((x) => x.OBJCAT === "UM");
  return { UT: UT.SHORT, UM: UM.SHORT };
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
  concatenarRelatoToSAP,
  mapearCategoriaOcupacional,
  mappingCamposUTMUT,
};
