import type { BoardDefinition } from "../../types/monday.js";

export const issuesCambiosBoard: BoardDefinition = {
  key: "issues_cambios",
  name: "Issues y Cambios",
  description: "Log de issues, solicitudes de cambio y decisiones del proyecto.",
  level: "operativo",
  pmiDomains: ["Incertidumbre", "Trabajo"],
  groups: [
    { id: "issues_abiertos", title: "Issues Abiertos", color: "#e2445c" },
    { id: "solicitudes_cambio", title: "Solicitudes de Cambio", color: "#a25ddc" },
    { id: "resueltos", title: "Resueltos", color: "#00c875" },
  ],
  columns: [
    { id: "tipo", title: "Tipo", type: "status", description: "Issue / Solicitud de Cambio / Decisión" },
    { id: "descripcion", title: "Descripción", type: "long_text" },
    { id: "prioridad", title: "Prioridad", type: "status" },
    { id: "impacto", title: "Impacto", type: "dropdown", description: "Alcance, Cronograma, Presupuesto, Calidad" },
    { id: "estado", title: "Estado", type: "status" },
    { id: "fecha_identificacion", title: "Fecha Identificación", type: "date" },
    { id: "fecha_resolucion", title: "Fecha Resolución", type: "date" },
    { id: "responsable", title: "Responsable", type: "people" },
    { id: "aprobador", title: "Aprobador", type: "people", description: "Quien autoriza el cambio" },
    { id: "riesgo_origen", title: "Riesgo Origen", type: "connect_boards", description: "Si viene de un riesgo materializado" },
    { id: "componente_afectado", title: "Componente Afectado", type: "dropdown" },
    { id: "resolucion", title: "Resolución", type: "long_text" },
    { id: "documentos", title: "Documentos", type: "file" },
  ],
  statusLabels: {
    tipo: [
      { index: 0, label: "Issue", color: "#e2445c" },
      { index: 1, label: "Solicitud Cambio", color: "#a25ddc" },
      { index: 2, label: "Decisión", color: "#579bfc" },
    ],
    prioridad: [
      { index: 0, label: "Crítica", color: "#e2445c" },
      { index: 1, label: "Alta", color: "#ff642e" },
      { index: 2, label: "Media", color: "#fdab3d" },
      { index: 3, label: "Baja", color: "#579bfc" },
    ],
    estado: [
      { index: 0, label: "Abierto", color: "#e2445c" },
      { index: 1, label: "En Análisis", color: "#fdab3d" },
      { index: 2, label: "Aprobado", color: "#00c875" },
      { index: 3, label: "Rechazado", color: "#333333" },
      { index: 4, label: "Implementado", color: "#037f4c" },
      { index: 5, label: "Cerrado", color: "#c4c4c4" },
    ],
  },
};
