export const NOMBRE_USUARIO = "Adrián Guajardo";

export const normalizarNombre = (valor = "") =>
  String(valor)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

export const personaCoincide = (valor, nombre = NOMBRE_USUARIO) =>
  normalizarNombre(valor) === normalizarNombre(nombre);

export const esAsignacionDePersona = (item, nombre = NOMBRE_USUARIO) =>
  Boolean(item) && (
    personaCoincide(item.encargado, nombre) ||
    personaCoincide(item.ayudante, nombre)
  );

export const obtenerAsignacionesPersona = (reunion, nombre = NOMBRE_USUARIO) => {
  if (!reunion || reunion.tipo !== "reunion") return [];

  const asignaciones = [];
  const base = {
    reunionNumero: reunion.numero,
    reunionTitulo: reunion.titulo,
    fecha: reunion.fecha,
    fechaLabel: reunion.fechaLabel,
    semana: reunion.semana,
    lectura: reunion.lectura,
  };

  if (personaCoincide(reunion.presidente, nombre)) {
    asignaciones.push({
      ...base,
      tipo: "Presidir",
      detalle: "Presidente de la reunión",
      tiempo: reunion.duracion,
    });
  }

  if (personaCoincide(reunion.oracion, nombre)) {
    asignaciones.push({
      ...base,
      tipo: "Oración final",
      detalle: "Oración de conclusión",
      tiempo: null,
    });
  }

  reunion.secciones?.forEach((seccion) => {
    seccion.contenido?.forEach((item) => {
      if (item.tipo !== "asignacion" || item.etiqueta === "Presidente") return;
      if (!esAsignacionDePersona(item, nombre)) return;

      const comoAyudante = personaCoincide(item.ayudante, nombre);
      asignaciones.push({
        ...base,
        tipo: item.titulo,
        detalle: seccion.titulo,
        tiempo: item.tiempo,
        numero: item.numero,
        rol: comoAyudante ? "Ayudante" : "Encargado",
        con: comoAyudante ? item.encargado : item.ayudante,
      });
    });
  });

  return asignaciones;
};

export const resumirAsignacionesPersona = (reunion, nombre = NOMBRE_USUARIO) => {
  const asignaciones = obtenerAsignacionesPersona(reunion, nombre);
  if (asignaciones.length === 0) return null;
  if (asignaciones.length === 1) return asignaciones[0].tipo;
  return `${asignaciones[0].tipo} + ${asignaciones.length - 1}`;
};
