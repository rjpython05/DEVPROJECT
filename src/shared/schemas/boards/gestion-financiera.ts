import type { BoardDefinition } from "../../types/monday.js";

export const gestionFinancieraBoard: BoardDefinition = {
  key: "gestion_financiera",
  name: "Gestión Financiera",
  description: "Capa de gestión y visibilidad presupuestaria. Se alimenta de Contratos y Plan de Adquisiciones.",
  level: "tactico",
  pmiDomains: ["Planificación", "Medición"],
  groups: [
    { id: "prestamo", title: "Préstamo/Donación", color: "#579bfc" },
    { id: "contrapartida", title: "Contrapartida Nacional", color: "#00c875" },
    { id: "otros", title: "Otros Fondos", color: "#fdab3d" },
  ],
  columns: [
    { id: "categoria_linea", title: "Categoría / Línea", type: "text", description: "Categoría de gasto o línea presupuestaria" },
    { id: "componente", title: "Componente", type: "dropdown" },
    { id: "fuente", title: "Fuente", type: "dropdown", description: "Préstamo, Contrapartida, Donación" },
    { id: "presupuesto_original", title: "Presupuesto Original (USD)", type: "numbers", description: "Según convenio" },
    { id: "presupuesto_vigente", title: "Presupuesto Vigente (USD)", type: "numbers", description: "Tras restructuraciones" },
    { id: "comprometido", title: "Comprometido (USD)", type: "numbers", description: "Mirror desde Contratos" },
    { id: "devengado", title: "Devengado (USD)", type: "numbers", description: "Entregables aceptados pendientes de pago" },
    { id: "pagado", title: "Pagado (USD)", type: "numbers", description: "Desembolsado efectivamente" },
    { id: "disponible", title: "Disponible (USD)", type: "numbers", description: "Vigente - Comprometido" },
    { id: "pct_ejecucion", title: "% Ejecución", type: "numbers", description: "(Pagado / Vigente) × 100" },
    { id: "semaforo", title: "Semáforo", type: "status", description: "% ejecución vs tiempo transcurrido" },
    { id: "contratos_asociados", title: "Contratos Asociados", type: "connect_boards", description: "Link a Contratos" },
    { id: "productos_vinculados", title: "Productos Vinculados", type: "connect_boards", description: "Link a Marco Lógico (trazabilidad pago→producto)" },
  ],
  statusLabels: {
    semaforo: [
      { index: 0, label: "Verde", color: "#00c875" },
      { index: 1, label: "Amarillo", color: "#fdab3d" },
      { index: 2, label: "Rojo", color: "#e2445c" },
    ],
  },
};
