const {
  formatearFecha,
  formatearTelefono,
  extraerNumeroDireccion,
  extraerRegionDireccion,
  formatearHoraSiniestro,
  mappingCamposUTMUT,
} = require("./extraccionData");

const mapearAdmisionObjeto = (id, datos) => {
  const {
    datosAdicionalesSAP: {
      apellidoMaterno,
      apellidoPaterno,
      nombre,
      fechaNacimiento,
      masculino,
      femenino,
      nacionalidad,
      lugarNacimiento,
      estadoCivil,
    },
    rut,
    telefonoParticular,
    direccionParticular,
    emailusuario,
    centrosForm, //: { centroData }, //Data centros oriana
    usuarioSAP, //Usuario SAP Aroni
  } = datos;
  const actualDateTime = new Date();
  const direccionComuna = direccionParticular.split(",");
  const unidadOrganizativa = mappingCamposUTMUT(centrosForm);
  const datosSAP = {
    Admisiones: {
      Id_admision_digital: id,
      Paciente: {
        Nombres: nombre,
        Apellido_pat: apellidoPaterno,
        Apellido_mat: apellidoMaterno,
        Fecha_nacimiento: formatearFecha(fechaNacimiento),
        Sexo: masculino ? "1" : "" || femenino ? "2" : "",
        titulo: "1", //En duro
        Nacionalidad: nacionalidad,
        Pais_nacimiento: lugarNacimiento,
        Estado_civil: estadoCivil,
        religion: "CR",
        tipo_documento: "RU",
        num_documento: rut,
        calle_dom: direccionComuna[0],
        numero_dom: extraerNumeroDireccion(direccionParticular),
        ciuidad: direccionComuna[1],
        region: extraerRegionDireccion(direccionComuna[1]),
        telefono: formatearTelefono(telefonoParticular),
        email: emailusuario || "",
      },
      Admision: {
        Fecha_inicio_episodio: formatearFecha(new Date().toISOString()), //Fecha actual
        Tipo_episodio: "01", // Camino Feliz siempre (01) Tipo Ley
        Clase_episodio: "CA",
        Clase_Consulta: "CU", //Camino feliz, CU(Consulta Urgencia)
        Fecha_movimiento: formatearFecha(new Date().toISOString()), //Fecha actual,
        Fecha_fin_movimiento: formatearFecha(new Date().toISOString()), //Fecha actual,
        Hora_movimiento: formatearHoraSiniestro({
          horas: actualDateTime.getHours(),
          minutos: actualDateTime.getMinutes(),
        }),
        Estado_externo: "RC",
        Unidad_organizativa: String(unidadOrganizativa.UT).trim(), //"PLATCAPR", // UT  //Campo Short
        Unidad_Org_medica: String(unidadOrganizativa.UM).trim(), //"PLAMAPRI", //UM //Campo Short
        Num_Medico_Tratamiento: "",
      },

      Usuario_Sap: String(usuarioSAP).trim(), //"MPARRAAR",
    },
  };
  return datosSAP;
};

module.exports = mapearAdmisionObjeto;
