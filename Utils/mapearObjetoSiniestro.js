const {
  formatearFechaSiniestro,
  formatearHoraSiniestro,
  extraerDatosDireccion,
  extraerRegionDireccion,
  formatearTelefono,
  formatearFecha,
  concatenarRelatoToSAP,
  mapearCategoriaOcupacional,
  alertaPorDefecto,
} = require("../Utils/extraccionData");

const normalizar = require("./ApiUtil/String");

const mapearObjetoSiniestro = (id, episodioID, datos) => {
  const {
    fechaHoraSiniestro,
    sucursalEmpresaSiniestro: { terms, description },
    lugarAccidente,
    descripcionAccidente,
    razonSocial,
    desarrollarTrabajoHabitual,
    datosAdicionalesSAP: { apellidoMaterno, apellidoPaterno, nombre },
    rut,
    telefonoParticular,
    razonSocialForm,
    tipoJornadaForm,
    inicioJornadaLaboral,
    finJornadaLaboral,
    ingresoTrabajoActual,
    tipoDeContrato,
    categoriaOcupacionalForm,
    tipoRemuneracion,
    isapreSeleccionado,
    afpForm,
    profesionForm,
    cargoForm,
    relatoAccidente,
    testigos,
    responsable,
    fechaHoraResponsable,
    lugarReferenciaSiniestro,
    usuarioSAP,
    SucursalEmpresaObjeto,
    razonAlertaForm,
    AccidenteEnSucursal,
  } = datos;

  const direccionSiniestro = extraerDatosDireccion(description);
  const actualDateTime = new Date();
  const inicioJornadaLaboralArr = inicioJornadaLaboral.split(":");
  const finJornadaLaboralArr = finJornadaLaboral.split(":");

  console.log("***************************************");
  console.log(SucursalEmpresaObjeto.codigo);
  console.log("***************************************");

  let motivo = "";
  if (
    typeof razonAlertaForm != "undefined" &&
    razonAlertaForm.hasOwnProperty("causasID")
  ) {
    motivo = !razonAlertaForm.causasID ? "" : `0${razonAlertaForm.causasID}`;
  }

  let comuna =
    typeof direccionSiniestro.comuna !== "undefined"
      ? direccionSiniestro.comuna
      : "";

  return {
    Id_siniestro_digital: id, //ID database
    Usuario_Sap: String(usuarioSAP).toUpperCase().trim(), //"MPARRAAR",
    Datos_Generales_Siniestro: {
      id_episodio: episodioID, //Servicio admision
      cun_interno: "",
      cun_externo: "",
      tipo_siniestro: "1",
      tipo_ley: "1",
      fecha_presentacion: formatearFecha(actualDateTime.toISOString()), //"13.08.2020",
      hora_presentacion: formatearHoraSiniestro({
        horas: actualDateTime.getHours(),
        minutos: actualDateTime.getMinutes(),
      }), //"12:00:00",
    },
    Siniestro: {
      fecha_accidente: formatearFechaSiniestro(fechaHoraSiniestro), //"13.08.2020",
      hora_accidente: formatearHoraSiniestro(fechaHoraSiniestro), //"12:00:00",
      calle: normalizar(direccionSiniestro.calle),
      numero: normalizar(direccionSiniestro.numero),
      comuna: normalizar(comuna),
      pais: "CL",
      localidad: normalizar(comuna),
      region: normalizar(extraerRegionDireccion(comuna)),
      lugar_accidente: "9", //No especificado, //"9",
      sitio_especifico_accidente: normalizar(String(lugarReferenciaSiniestro)), //"calle", DUDA
      que_hacia_trabajador: normalizar(lugarAccidente), //"caminando a visitar cliente", DUDA
      mecanismo_accidente: "92",
      que_paso_accidente: concatenarRelatoToSAP(
        normalizar(relatoAccidente),
        testigos, //normalizar(testigos),
        responsable, //normalizar(responsable),
        fechaHoraResponsable //normalizar(fechaHoraResponsable)
      ), //DUDA
      agente_accidente: "700",
      desarrollaba_trabajo_habitual: normalizar(
        desarrollarTrabajoHabitual
      ).toUpperCase(), //"SI",
      criterio_gravedad: "1",
      tipo_accidente_trayecto: "",
      parte_cuerpo_afectada: "900",
      accidente_ocurrio_en_sucursal: String(AccidenteEnSucursal)
        .trim()
        .toUpperCase(),
    },
    Denunciante: {
      clasificacion: "2",
      rut: rut, //"17151821-0",
      nombre_completo: normalizar(
        `${nombre} ${apellidoPaterno} ${apellidoMaterno}`
      ), //"BRIAN ISRAEL BRIONES SANTIBAÑEZ",
      telefono: formatearTelefono(telefonoParticular), //"976765456",
    },
    /*Alerta_Clasif_trayecto: {
      trabajador_dirigente_sindical: "",
      trabajador_a_distancia: "",
      fuerza_mayor_extrana: "",
      acciente_en_control_medico: "",
      no_registra_alerta: "",
    },*/
    Alerta_Cal_trabajo: {
      posible_causa_nolaboral:
        razonAlertaForm &&
        razonAlertaForm.glosa === "Posible causa no laboral".trim()
          ? "X"
          : "", //"X",
      dir_sindical_cometido_gremial:
        razonAlertaForm &&
        razonAlertaForm.glosa ===
          "Dirigente sindical en cometido gremial".trim()
          ? "X"
          : "",
      trabajo_distancia:
        razonAlertaForm &&
        razonAlertaForm.glosa === "Trabajo a distancia".trim()
          ? "X"
          : "",
      fuerza_mayor_extrana:
        razonAlertaForm &&
        razonAlertaForm.glosa === "Fuerza mayor extraña".trim()
          ? "X"
          : "",
      acc_control_medico:
        razonAlertaForm &&
        razonAlertaForm.glosa === "Accidente en control médico".trim()
          ? "X"
          : "",
      no_registra_alerta: alertaPorDefecto(razonAlertaForm),
      // typeof razonAlertaForm !== "undefined" &&
      // razonAlertaForm.glosa === "No registra alerta".trim()
      //   ? "X"
      //   : "",
      motivo: motivo,
    },
    cabecera_sin: {
      codigo: String(fomrat(SucursalEmpresaObjeto.codigo, 10)), // BP Empresa"2000462553",
      razon_social: normalizar(razonSocial.name), //"empresa",
      numero_sucursal_achs: "",
      direccion_sucursal_achs: normalizar(SucursalEmpresaObjeto.direccion), //"calle ramon carnicer",
      rubro: "",
      CIUU: "",
    },
    ocupacion_sin: {
      tipo_jornada: String(tipoJornadaForm.id), //"1",
      comentario_jornada: "SIN INFORMACION",
      horario_inicio: formatearHoraSiniestro({
        horas: inicioJornadaLaboralArr[0],
        minutos: inicioJornadaLaboralArr[1],
      }), // String(inicioJornadaLaboral), //"09:00:00",
      horario_termino: formatearHoraSiniestro({
        horas: finJornadaLaboralArr[0],
        minutos: finJornadaLaboralArr[1],
      }), //String(finJornadaLaboral), //"18:00:00",
      ocupacion: cargoForm, //"SIN INFORMACION",
      profesion_CIOU: String(profesionForm.codigo), //"9629",
      puesto_trabajo: "TRABAJADOR", //En blaco,
      fecha_ingreso_trab: formatearFecha(ingresoTrabajoActual), //"01.01.1998",
      duracion_contrato: String(tipoDeContrato.id), //"3",
      categoria_ocup: String(categoriaOcupacionalForm.id), //mapearCategoriaOcupacional(categoriaOcupacionalForm), //String(categoriaOcupacionalForm.id), //"2",
      dependencia: mapearCategoriaOcupacional(categoriaOcupacionalForm), //"1", //Mapear el parametro depedencia
      remuneracion: String(tipoRemuneracion.id), //"1",
      prevision_salud: String(isapreSeleccionado.id), //"1000002260",
      afp: String(afpForm.codigo), //"42",
      caja_compensacion: "", //Vacio solo para el piloto,
    },
  };
};

//Se utiliza para formatear el siniestro
function fomrat(number, width) {
  var numberOutput = Math.abs(number); /* Valor absoluto del número */
  var length = number.toString().length; /* Largo del número */
  var zero = "0"; /* String de cero */

  if (width <= length) {
    if (number < 0) {
      return "-" + numberOutput.toString();
    } else {
      return numberOutput.toString();
    }
  } else {
    if (number < 0) {
      return "-" + zero.repeat(width - length) + numberOutput.toString();
    } else {
      return zero.repeat(width - length) + numberOutput.toString();
    }
  }
}

module.exports = mapearObjetoSiniestro;
