import type { BoardDefinition } from "../../types/monday.js";

export const pipelineBoard: BoardDefinition = {
  key: "pipeline",
  name: "Pipeline de Aprobación",
  description: "Punto de entrada para nuevos proyectos. Intake, evaluación y aprobación.",
  level: "estrategico",
  pmiDomains: ["Stakeholders", "Planificación"],
  groups: [
    { id: "recibidos", title: "Recibidos", color: "#579bfc" },
    { id: "en_evaluacion", title: "En Evaluación", color: "#fdab3d" },
    { id: "aprobados", title: "Aprobados", color: "#00c875" },
    { id: "rechazados", title: "Rechazados", color: "#e2445c" },
    { id: "en_negociacion", title: "En Negociación", color: "#a25ddc" },
  ],
  columns: [
    { id: "sector", title: "Sector", type: "dropdown", description: "Educación, Salud, Infraestructura, Agricultura, Energía, Gobernanza" },
    { id: "fuente_financiamiento", title: "Fuente Financiamiento", type: "dropdown", description: "BID, Banco Mundial, CAF, AECID, UE, USAID, Nacional, Mixto" },
    { id: "monto_estimado", title: "Monto Estimado (USD)", type: "numbers", description: "Presupuesto total estimado" },
    { id: "institucion_beneficiaria", title: "Institución Beneficiaria", type: "text", description: "Entidad receptora de recursos" },
    { id: "estado_aprobacion", title: "Estado Aprobación", type: "status", description: "Recibido → En Evaluación → Aprobado → Rechazado → En Negociación" },
    { id: "puntuacion", title: "Puntuación Priorización", type: "numbers", description: "Criterios: alineación estratégica, impacto, viabilidad" },
    { id: "documentos", title: "Documentos", type: "file", description: "Perfil, nota conceptual, estudios previos" },
    { id: "fecha_recepcion", title: "Fecha Recepción", type: "date", description: "Fecha de ingreso al pipeline" },
    { id: "responsable_evaluacion", title: "Responsable Evaluación", type: "people", description: "Persona asignada para evaluar" },
    { id: "notas", title: "Notas", type: "long_text", description: "Observaciones del evaluador" },
  ],
  statusLabels: {
    estado_aprobacion: [
      { index: 0, label: "Recibido", color: "#579bfc" },
      { index: 1, label: "En Evaluación", color: "#fdab3d" },
      { index: 2, label: "Aprobado", color: "#00c875" },
      { index: 3, label: "Rechazado", color: "#e2445c" },
      { index: 4, label: "En Negociación", color: "#a25ddc" },
    ],
  },
};
