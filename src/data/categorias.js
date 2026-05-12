import { BOSQUEJOS_30 } from "./bosquejos30";
import { CONGREGACION } from "./congregacion";
import { REUNIONES_MAYO_2026 } from "./reunionesMayo2026";

export const CATEGORIAS = [
  {
    id: "reuniones",
    label: "Reuniones",
    icono: "🗓️",
    duracionDefault: null,
    itemLabelSingular: "reunión",
    itemLabelPlural: "reuniones",
    discursos: REUNIONES_MAYO_2026,
  },
  {
    id: "bosquejos30",
    label: "Bosquejos 30 min.",
    icono: "📖",
    duracionDefault: 30,
    itemLabelSingular: "discurso",
    itemLabelPlural: "discursos",
    discursos: BOSQUEJOS_30,
  },
  {
    id: "congregacion",
    label: "Congregación",
    icono: "🏛️",
    duracionDefault: null,
    itemLabelSingular: "discurso",
    itemLabelPlural: "discursos",
    discursos: CONGREGACION,
  },
];
