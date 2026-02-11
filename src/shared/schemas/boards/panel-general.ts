import type { BoardDefinition } from "../../types/monday.js";

export const panelGeneralBoard: BoardDefinition = {
  key: "panel_general",
  name: "Panel General Proyecto",
  description: "Vista 360° del proyecto: estado, fases, KPIs consolidados.",
  level: "tactico",
  pmiDomains: ["Stakeholders", "Equipo", "Ciclo de Vida", "Planificación", "Trabajo", "Entrega", "Medición", "Incertidumbre"],
  groups: [
    { id: "info_general", title: "Información General", color: "#579bfc" },
    { id: "indicadores_clave", title: "Indicadores Clave", color: "#00c875" },
    { id: "alertas", title: "Alertas y Pendientes", color: "#e2445c" },
  ],
  columns: [
    { id: "descripcion", title: "Descripción", type: "long_text" },
    { id: "financiador", title: "Financiador", type: "dropdown" },
    { id: "monto_total", title: "Monto Total (USD)", type: "numbers" },
    { id: "fase_actual", title: "Fase Actual", type: "status" },
    { id: "fecha_efectividad", title: "Fecha Efectividad", type: "date" },
    { id: "fecha_cierre", title: "Fecha Cierre", type: "date" },
    { id: "coordinador", title: "Coordinador General", type: "people" },
    { id: "avance_global", title: "Avance Global (%)", type: "numbers" },
    { id: "ejecucion_financiera", title: "Ejecución Financiera (%)", type: "numbers" },
    { id: "semaforo_general", title: "Semáforo General", type: "status" },
    { id: "num_riesgos_criticos", title: "Riesgos Críticos", type: "numbers" },
    { id: "procesos_pendientes", title: "Procesos Pendientes No Objeción", type: "numbers" },
    { id: "actividades_retrasadas", title: "Actividades Retrasadas", type: "numbers" },
  ],
  statusLabels: {
    fase_actual: [
      { index: 0, label: "Formulación", color: "#579bfc" },
      { index: 1, label: "Negociación", color: "#a25ddc" },
      { index: 2, label: "Inicio", color: "#fdab3d" },
      { index: 3, label: "Ejecución", color: "#00c875" },
      { index: 4, label: "Cierre", color: "#ff642e" },
      { index: 5, label: "Ex-Post", color: "#c4c4c4" },
    ],
    semaforo_general: [
      { index: 0, label: "Verde", color: "#00c875" },
      { index: 1, label: "Amarillo", color: "#fdab3d" },
      { index: 2, label: "Rojo", color: "#e2445c" },
    ],
  },
};
