import type { BoardDefinition } from "../../types/monday.js";

export const marcoLogicoBoard: BoardDefinition = {
  key: "marco_logico",
  name: "Marco Lógico / Resultados",
  description: "Corazón del proyecto. Conecta objetivos con indicadores, metas y medios de verificación.",
  level: "tactico",
  pmiDomains: ["Planificación", "Entrega", "Medición"],
  groups: [
    { id: "fin", title: "Fin (Impacto)", color: "#a25ddc" },
    { id: "proposito", title: "Propósito (Resultado Directo)", color: "#579bfc" },
    { id: "resultados", title: "Resultados (Componentes)", color: "#00c875" },
    { id: "actividades", title: "Actividades", color: "#fdab3d" },
  ],
  columns: [
    { id: "nivel", title: "Nivel", type: "status", description: "Fin / Propósito / Resultado / Actividad" },
    { id: "componente", title: "Componente", type: "dropdown", description: "Componente 1, 2, ..., N, Administración" },
    { id: "indicador", title: "Indicador", type: "text", description: "Indicador verificable (ej: # escuelas construidas)" },
    { id: "linea_base", title: "Línea Base", type: "numbers", description: "Valor inicial" },
    { id: "meta_final", title: "Meta Final", type: "numbers", description: "Valor objetivo al cierre" },
    { id: "meta_anual", title: "Meta Anual", type: "numbers", description: "Meta del período actual" },
    { id: "avance_actual", title: "Avance Actual", type: "numbers", description: "Valor medido a la fecha" },
    { id: "pct_cumplimiento", title: "% Cumplimiento", type: "numbers", description: "(Avance / Meta Anual) × 100" },
    { id: "semaforo", title: "Semáforo", type: "status", description: "Auto: Verde (>80%) / Amarillo (50-80%) / Rojo (<50%)" },
    { id: "medio_verificacion", title: "Medio de Verificación", type: "text", description: "Fuente de datos para medir" },
    { id: "supuestos_riesgos", title: "Supuestos/Riesgos", type: "connect_boards", description: "Link al Registro de Riesgos" },
    { id: "presupuesto", title: "Presupuesto (USD)", type: "numbers", description: "Mirror desde Gestión Financiera" },
    { id: "responsable", title: "Responsable", type: "people", description: "Coordinador de componente" },
  ],
  statusLabels: {
    nivel: [
      { index: 0, label: "Fin", color: "#a25ddc" },
      { index: 1, label: "Propósito", color: "#579bfc" },
      { index: 2, label: "Resultado", color: "#00c875" },
      { index: 3, label: "Actividad", color: "#fdab3d" },
    ],
    semaforo: [
      { index: 0, label: "Verde", color: "#00c875" },
      { index: 1, label: "Amarillo", color: "#fdab3d" },
      { index: 2, label: "Rojo", color: "#e2445c" },
    ],
  },
};
