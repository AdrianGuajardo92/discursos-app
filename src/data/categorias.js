import { BOSQUEJOS_30 } from "./bosquejos30";
import { CONGREGACION } from "./congregacion";

export const CATEGORIAS = [
  {
    id: "bosquejos30",
    label: "Bosquejos 30 min.",
    icono: "📖",
    duracionDefault: 30,
    discursos: BOSQUEJOS_30,
  },
  {
    id: "congregacion",
    label: "Congregación",
    icono: "🏛️",
    duracionDefault: null,
    discursos: CONGREGACION,
  },
];
