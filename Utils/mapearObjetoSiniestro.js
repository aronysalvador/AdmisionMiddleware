const {
  formatearFechaSiniestro,
  formatearHoraSiniestro,
  extraerDatosDireccion,
  extraerRegionDireccion,
  formatearTelefono,
  formatearFecha,
  concatenarRelatoToSAP,
  mapearCategoriaOcupacional,
} = require("../Utils/extraccionData");

const mapearObjetoSiniestro = (id, episodioID, datos) => {
  const {
    fechaHoraSiniestro,
    sucursalEmpresaSiniestro: { terms },
    lugarAccidente,
    descripcionAccidente,
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
  } = datos;

  const direccionSiniestro = extraerDatosDireccion(terms);
  const actualDateTime = new Date();
  const inicioJornadaLaboralArr = inicioJornadaLaboral.split(":");
  const finJornadaLaboralArr = finJornadaLaboral.split(":");
  return {
    Id_siniestro_digital: id, //ID database
    Usuario_Sap: "MPARRAAR",
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
      calle: direccionSiniestro.calle,
      numero: direccionSiniestro.numero,
      comuna: direccionSiniestro.comuna,
      pais: "CL",
      localidad: direccionSiniestro.comuna,
      region: extraerRegionDireccion(direccionSiniestro.comuna),
      lugar_accidente: "9", //No especificado, //"9",
      sitio_especifico_accidente: String(lugarReferenciaSiniestro), //"calle", DUDA
      que_hacia_trabajador: lugarAccidente, //"caminando a visitar cliente", DUDA
      mecanismo_accidente: "92",
      que_paso_accidente: concatenarRelatoToSAP(
        relatoAccidente,
        testigos,
        responsable,
        fechaHoraResponsable
      ), //DUDA
      agente_accidente: "700",
      desarrollaba_trabajo_habitual: String(
        desarrollarTrabajoHabitual
      ).toUpperCase(), //"SI",
      criterio_gravedad: "1",
      tipo_accidente_trayecto: "",
      parte_cuerpo_afectada: "900",
      accidente_ocurrio_en_sucursal: "NO",
    },
    Denunciante: {
      clasificacion: "2",
      rut: rut, //"17151821-0",
      nombre_completo: `${nombre} ${apellidoPaterno} ${apellidoMaterno}`, //"BRIAN ISRAEL BRIONES SANTIBAÑEZ",
      telefono: formatearTelefono(telefonoParticular), //"976765456",
    },
    Alerta_Clasif_trayecto: {
      trabajador_dirigente_sindical: "",
      trabajador_a_distancia: "",
      fuerza_mayor_extrana: "",
      acciente_en_control_medico: "",
      no_registra_alerta: "X",
    },
    cabecera_sin: {
      codigo: "2000462553",
      razon_social: razonSocialForm, //"empresa",
      numero_sucursal_achs: "124",
      direccion_sucursal_achs: "calle ramon carnicer",
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
      categoria_ocup: mapearCategoriaOcupacional(categoriaOcupacionalForm), //String(categoriaOcupacionalForm.id), //"2",
      dependencia: "1",
      remuneracion: String(tipoRemuneracion.id), //"1",
      prevision_salud: String(isapreSeleccionado.id), //"1000002260",
      afp: String(afpForm.codigo), //"42",
      caja_compensacion: "", //Vacio solo para el piloto,
    },
  };
};

module.exports = mapearObjetoSiniestro;
