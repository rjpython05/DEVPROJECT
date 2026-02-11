import type { BoardDefinition } from "../../types/monday.js";

export const leccionesAprendidasBoard: BoardDefinition = {
  key: "lecciones_aprendidas",
  name: "Lecciones Aprendidas",
  description: "Registro continuo de lecciones para mejora y cierre del proyecto.",
  level: "operativo",
  pmiDomains: ["Incertidumbre", "Medición"],
  groups: [
    { id: "tecnicas", title: "Técnicas", color: "#579bfc" },
    { id: "gestion", title: "Gestión", color: "#fdab3d" },
    { id: "adquisiciones", title: "Adquisiciones", color: "#a25ddc" },
    { id: "stakeholders", title: "Stakeholders", color: "#00c875" },
  ],
  columns: [
    { id: "area", title: "Área", type: "dropdown", description: "Técnica, Gestión, Adquisiciones, Financiera, Stakeholders" },
    { id: "tipo_leccion", title: "Tipo", type: "status", description: "Buena Práctica / Área de Mejora" },
    { id: "descripcion", title: "Descripción", type: "long_text", description: "Qué sucedió y qué se aprendió" },
    { id: "situacion", title: "Situación/Contexto", type: "long_text" },
    { id: "recomendacion", title: "Recomendación", type: "long_text", description: "Acción sugerida para futuros proyectos" },
    { id: "componente", title: "Componente", type: "dropdown" },
    { id: "fase", title: "Fase del Proyecto", type: "status" },
    { id: "registrado_por", title: "Registrado por", type: "people" },
    { id: "fecha_registro", title: "Fecha Registro", type: "date" },
    { id: "issue_relacionado", title: "Issue Relacionado", type: "connect_boards" },
  ],
  statusLabels: {
    tipo_leccion: [
      { index: 0, label: "Buena Práctica", color: "#00c875" },
      { index: 1, label: "Área de Mejora", color: "#fdab3d" },
    ],
    fase: [
      { index: 0, label: "Inicio", color: "#579bfc" },
      { index: 1, label: "Ejecución", color: "#00c875" },
      { index: 2, label: "Cierre", color: "#ff642e" },
    ],
  },
};
