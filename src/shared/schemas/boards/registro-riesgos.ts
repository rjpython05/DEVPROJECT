import type { BoardDefinition } from "../../types/monday.js";

export const registroRiesgosBoard: BoardDefinition = {
  key: "registro_riesgos",
  name: "Registro de Riesgos",
  description: "Gestión formal: identificación, análisis cualitativo (P×I), planificación de respuesta, monitoreo.",
  level: "tactico",
  pmiDomains: ["Incertidumbre"],
  groups: [
    { id: "criticos", title: "Críticos", color: "#e2445c" },
    { id: "altos", title: "Altos", color: "#ff642e" },
    { id: "medios", title: "Medios", color: "#fdab3d" },
    { id: "bajos", title: "Bajos", color: "#00c875" },
  ],
  columns: [
    { id: "descripcion", title: "Descripción", type: "long_text", description: "Si [causa], entonces [efecto]" },
    { id: "categoria", title: "Categoría", type: "dropdown", description: "Fiduciario, Técnico, Ambiental, Social, Político, Adquisiciones" },
    { id: "probabilidad", title: "Probabilidad (1-5)", type: "numbers", description: "Escala 1-5" },
    { id: "impacto", title: "Impacto (1-5)", type: "numbers", description: "Escala 1-5" },
    { id: "nivel_riesgo", title: "Nivel Riesgo (P×I)", type: "numbers", description: "Calculado: 1-25. Crítico/Alto/Medio/Bajo" },
    { id: "nivel_status", title: "Nivel", type: "status", description: "Crítico (>15) / Alto (10-15) / Medio (5-9) / Bajo (<5)" },
    { id: "estrategia", title: "Estrategia", type: "dropdown", description: "Evitar, Mitigar, Transferir, Aceptar, Escalar" },
    { id: "accion_mitigacion", title: "Acción Mitigación", type: "text", description: "Acción concreta planificada" },
    { id: "responsable", title: "Responsable", type: "people", description: "Dueño del riesgo" },
    { id: "estado", title: "Estado", type: "status", description: "Abierto / En Mitigación / Materializado / Cerrado" },
    { id: "marco_logico", title: "Resultado Afectado", type: "connect_boards", description: "Resultado del Marco Lógico que afecta" },
    { id: "issue_generado", title: "Issue Generado", type: "connect_boards", description: "Si se materializó, link al issue" },
    { id: "fecha_identificacion", title: "Fecha Identificación", type: "date" },
    { id: "ultima_revision", title: "Última Revisión", type: "date" },
  ],
  statusLabels: {
    nivel_status: [
      { index: 0, label: "Crítico", color: "#e2445c" },
      { index: 1, label: "Alto", color: "#ff642e" },
      { index: 2, label: "Medio", color: "#fdab3d" },
      { index: 3, label: "Bajo", color: "#00c875" },
    ],
    estado: [
      { index: 0, label: "Abierto", color: "#579bfc" },
      { index: 1, label: "En Mitigación", color: "#fdab3d" },
      { index: 2, label: "Materializado", color: "#e2445c" },
      { index: 3, label: "Cerrado", color: "#c4c4c4" },
    ],
  },
};
