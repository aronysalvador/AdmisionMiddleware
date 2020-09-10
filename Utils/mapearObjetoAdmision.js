const {
  formatearFecha,
  formatearTelefono,
  extraerNumeroDireccion,
  extraerRegionDireccion,
  formatearHoraSiniestro,
  extraerCalleDireccion,
  mappingCamposUTMUT,
} = require("./extraccionData");

const normalizar = require("./ApiUtil/String");

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
    comunaDireccionParticular
  } = datos;
  const actualDateTime = new Date();
  const direccionComuna = direccionParticular.split(",");
  //const unidadOrganizativa = mappingCamposUTMUT(centrosForm);
  const datosSAP = {
    Admisiones: {
      Id_admision_digital: id,
      Paciente: {
        Nombres: normalizar(nombre),
        Apellido_pat: normalizar(apellidoPaterno),
        Apellido_mat: normalizar(apellidoMaterno),
        Fecha_nacimiento: formatearFecha(fechaNacimiento),
        Sexo: masculino ? "1" : "" || femenino ? "2" : "",
        titulo: masculino ? "1" : "" || femenino ? "2" : "", //En duro
        Nacionalidad: normalizar(nacionalidad),
        Pais_nacimiento: normalizar(nacionalidad), //lugarNacimiento, parcheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
        Estado_civil: normalizar(estadoCivil),
        religion: "CR",
        tipo_documento: "RU",
        num_documento: rut,
        calle_dom: normalizar(extraerCalleDireccion(direccionComuna[0])),
        numero_dom: normalizar(extraerNumeroDireccion(direccionParticular)),
        ciuidad: String(comunaDireccionParticular.trim()).toUpperCase(),
        region: normalizar(extraerRegionDireccion(direccionComuna[1])),
        telefono: normalizar(formatearTelefono(telefonoParticular)),
        email: emailusuario || "",
      },
      Admision: {
        Fecha_inicio_episodio: formatearFecha(new Date().toISOString()), //Fecha actual
        Tipo_episodio: "01", // Camino Feliz siempre (01) Tipo Ley
        Clase_episodio: "CU",
        Clase_Consulta: "CU", //Camino feliz, CU(Consulta Urgencia)
        Fecha_movimiento: formatearFecha(new Date().toISOString()), //Fecha actual,
        Fecha_fin_movimiento: formatearFecha(new Date().toISOString()), //Fecha actual,
        Hora_movimiento: formatearHoraSiniestro({
          horas: actualDateTime.getHours(),
          minutos: actualDateTime.getMinutes(),
        }),
        Estado_externo: "RC",
        Unidad_organizativa: String(centrosForm.UO_Tratamiento).trim(),
        Unidad_Org_medica: String(centrosForm.UO_Medica).trim(),
        Num_Medico_Tratamiento: "",
      },

      Usuario_Sap: String(usuarioSAP).toUpperCase().trim(), //"MPARRAAR",
    },
  };
  return datosSAP;
};

module.exports = mapearAdmisionObjeto;
