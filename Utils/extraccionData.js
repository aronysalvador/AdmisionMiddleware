const comunas = require("./comunas.json");
const normalizar = require("./ApiUtil/String");

function extraerNumeroDireccion(direccionParticular) {
  if (direccionParticular) {
    let numberPattern = /\d+/g;
    const result = direccionParticular.match(numberPattern);
    return result ? result[0] : "";
  }
  return "";
}

function extraerCalleDireccion(direccionParticular) {
  if (direccionParticular) {
    let numberPattern = /\d+/g;
    const result = String(direccionParticular)
      .replace(numberPattern, "")
      .trim();
    return result ? result : "";
  }
  return "";
}

function extraerDatosDireccion(direccion) {
  if (direccion) {
    const direccionSiniestro = String(direccion).split(",");
    // const direccionSiniestro = direccion.map((x) => x.value);
    const numero2 = extraerNumeroDireccion(direccionSiniestro[0]);
    const calle = extraerCalleDireccion(direccionSiniestro[0]);
    return {
      calle: String(calle).trim(), //Calle
      numero: String(numero2).trim(),
      comuna: String(direccionSiniestro[1]).trim(),
    };
  }
  return "";
}

function extraerRegionDireccion(comuna) {
  console.log("input", comuna);

  //console.log("",)

  if (comuna) {
    const codigo_region = comunas.find(
      (x) => x.nombre === String(comuna).trim().toUpperCase()
    );
    const result = !codigo_region ? "" : codigo_region.codigo_region;
    return result;
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
  const horaSiniestro = `${horas < 10 && horas != '00' ? `0${String(horas)}` : String(horas)}:${
    minutos === 0
      ? "00".trim()
      : minutos < 10 && minutos != '00'
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
  //if (Object.values(testigo).length > 0 )
  if (testigo.nombre && testigo.cargo)
    datosTestigo = `Tiene testigos de su accidente, el nombre y el cargo es ${normalizar(
      String(testigo.nombre)
    )} ${normalizar(String(testigo.cargo))}`;
  else datosTestigo = "No tiene testigos de su accidente";

  //Sí tiene responsables
  //if (Object.values(responsable).length > 0)

  console.log(
    "************************************************************************"
  );
  console.log("npmbre", typeof responsable.nombre);
  console.log("cargo", typeof responsable.cargo);
  console.log(
    "************************************************************************"
  );

  if (responsable.nombre && responsable.cargo)
    datosResponsable = `Avisó a la empresa, el nombre y cargo  de la persona es ${normalizar(
      String(responsable.nombre)
    )}, ${normalizar(
      String(responsable.cargo)
    )}, fecha y hora en que aviso a su empresa sobre el accidente: ${String(
      fechaResponsable
    )} a las ${String(horaResponsable)}`;
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

//Alertas calificacion, no tiene alerta por defecto
function alertaPorDefecto(razonAlertaForm) {
  const result = !razonAlertaForm ? "X" : "";
  return result;
}
module.exports = {
  extraerNumeroDireccion,
  extraerRegionDireccion,
  extraerCalleDireccion,
  formatearFecha,
  formatearTelefono,
  formatearFechaSiniestro,
  formatearHoraSiniestro,
  extraerDatosDireccion,
  sleep,
  concatenarRelatoToSAP,
  mapearCategoriaOcupacional,
  mappingCamposUTMUT,
  alertaPorDefecto,
};
