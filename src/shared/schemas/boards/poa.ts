import type { BoardDefinition } from "../../types/monday.js";

export const poaBoard: BoardDefinition = {
  key: "poa",
  name: "POA (Plan Operativo Anual)",
  description: "Operativiza el Marco Lógico en actividades con cronograma, presupuesto y responsables.",
  level: "tactico",
  pmiDomains: ["Planificación", "Trabajo"],
  groups: [
    { id: "q1", title: "Q1 (Ene-Mar)", color: "#579bfc" },
    { id: "q2", title: "Q2 (Abr-Jun)", color: "#00c875" },
    { id: "q3", title: "Q3 (Jul-Sep)", color: "#fdab3d" },
    { id: "q4", title: "Q4 (Oct-Dic)", color: "#a25ddc" },
  ],
  columns: [
    { id: "componente", title: "Componente", type: "dropdown", description: "Componente al que pertenece" },
    { id: "resultado_vinculado", title: "Resultado Vinculado", type: "connect_boards", description: "Link al Marco Lógico" },
    { id: "responsable", title: "Responsable", type: "people", description: "Quien ejecuta" },
    { id: "fecha_inicio_plan", title: "Fecha Inicio Planificada", type: "date" },
    { id: "fecha_fin_plan", title: "Fecha Fin Planificada", type: "date" },
    { id: "fecha_inicio_real", title: "Fecha Inicio Real", type: "date" },
    { id: "fecha_fin_real", title: "Fecha Fin Real", type: "date" },
    { id: "estado", title: "Estado", type: "status", description: "No iniciada / En progreso / Completada / Retrasada / Cancelada" },
    { id: "pct_avance", title: "% Avance", type: "numbers", description: "Porcentaje de completitud" },
    { id: "presupuesto_plan", title: "Presupuesto Planificado (USD)", type: "numbers" },
    { id: "presupuesto_ejecutado", title: "Presupuesto Ejecutado (USD)", type: "numbers" },
    { id: "proceso_adquisicion", title: "Proceso Adquisición", type: "connect_boards", description: "Link si requiere adquisición" },
    { id: "dependencias", title: "Dependencias", type: "dependency", description: "Predecesoras (FS, SS, FF, SF)" },
    { id: "prioridad", title: "Prioridad", type: "status", description: "Alta / Media / Baja" },
  ],
  statusLabels: {
    estado: [
      { index: 0, label: "No Iniciada", color: "#c4c4c4" },
      { index: 1, label: "En Progreso", color: "#fdab3d" },
      { index: 2, label: "Completada", color: "#00c875" },
      { index: 3, label: "Retrasada", color: "#e2445c" },
      { index: 4, label: "Cancelada", color: "#333333" },
    ],
    prioridad: [
      { index: 0, label: "Alta", color: "#e2445c" },
      { index: 1, label: "Media", color: "#fdab3d" },
      { index: 2, label: "Baja", color: "#579bfc" },
    ],
  },
};
