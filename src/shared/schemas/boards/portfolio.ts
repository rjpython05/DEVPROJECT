import type { BoardDefinition } from "../../types/monday.js";

export const portfolioBoard: BoardDefinition = {
  key: "portfolio",
  name: "Portafolio de Proyectos",
  description: "Vista ejecutiva consolidada de todos los proyectos activos.",
  level: "estrategico",
  pmiDomains: ["Stakeholders", "Medición"],
  groups: [
    { id: "activos", title: "Proyectos Activos", color: "#00c875" },
    { id: "en_formulacion", title: "En Formulación", color: "#fdab3d" },
    { id: "cerrados", title: "Cerrados", color: "#c4c4c4" },
  ],
  columns: [
    { id: "codigo_proyecto", title: "Código Proyecto", type: "text", description: "Identificador único del proyecto" },
    { id: "financiador", title: "Financiador", type: "dropdown", description: "Organismo financiador principal" },
    { id: "monto_total", title: "Monto Total (USD)", type: "numbers", description: "Presupuesto total del proyecto" },
    { id: "fase", title: "Fase", type: "status", description: "Fase actual del ciclo de vida" },
    { id: "coordinador", title: "Coordinador General", type: "people", description: "Líder del proyecto" },
    { id: "fecha_inicio", title: "Fecha Inicio", type: "date" },
    { id: "fecha_fin", title: "Fecha Fin Planificada", type: "date" },
    { id: "avance_fisico", title: "Avance Físico (%)", type: "numbers", description: "Porcentaje de avance en productos" },
    { id: "ejecucion_financiera", title: "Ejecución Financiera (%)", type: "numbers", description: "Porcentaje de presupuesto ejecutado" },
    { id: "semaforo", title: "Semáforo", type: "status", description: "Estado general: Verde/Amarillo/Rojo" },
    { id: "riesgos_criticos", title: "Riesgos Críticos", type: "numbers", description: "Cantidad de riesgos críticos abiertos" },
    { id: "sector", title: "Sector", type: "dropdown" },
  ],
  statusLabels: {
    fase: [
      { index: 0, label: "Formulación", color: "#579bfc" },
      { index: 1, label: "Negociación", color: "#a25ddc" },
      { index: 2, label: "Inicio", color: "#fdab3d" },
      { index: 3, label: "Ejecución", color: "#00c875" },
      { index: 4, label: "Cierre", color: "#ff642e" },
      { index: 5, label: "Ex-Post", color: "#c4c4c4" },
    ],
    semaforo: [
      { index: 0, label: "Verde", color: "#00c875" },
      { index: 1, label: "Amarillo", color: "#fdab3d" },
      { index: 2, label: "Rojo", color: "#e2445c" },
    ],
  },
};
