import type { BoardDefinition } from "../../types/monday.js";

export const contratosBoard: BoardDefinition = {
  key: "contratos",
  name: "Gestión de Contratos",
  description: "Contratos activos con entregables, pagos y evaluaciones. Subítems = entregables contractuales.",
  level: "operativo",
  pmiDomains: ["Trabajo", "Entrega"],
  groups: [
    { id: "vigentes", title: "Vigentes", color: "#00c875" },
    { id: "en_enmienda", title: "En Enmienda", color: "#fdab3d" },
    { id: "suspendidos", title: "Suspendidos", color: "#e2445c" },
    { id: "cerrados", title: "Cerrados", color: "#c4c4c4" },
  ],
  columns: [
    { id: "numero_contrato", title: "Número Contrato", type: "text", description: "Identificador único" },
    { id: "contratista", title: "Contratista/Consultor", type: "text", description: "Firma o consultor individual" },
    { id: "objeto", title: "Objeto", type: "text", description: "Alcance del contrato" },
    { id: "tipo_contrato", title: "Tipo Contrato", type: "dropdown", description: "Suma Alzada, Precio Unitario, T&M, Costo Reembolsable" },
    { id: "monto_contrato", title: "Monto Contrato (USD)", type: "numbers" },
    { id: "monto_pagado", title: "Monto Pagado (USD)", type: "numbers" },
    { id: "pct_pagado", title: "% Pagado", type: "numbers", description: "(Pagado / Contrato) × 100" },
    { id: "fecha_inicio", title: "Fecha Inicio", type: "date" },
    { id: "fecha_fin_original", title: "Fecha Fin Original", type: "date" },
    { id: "fecha_fin_vigente", title: "Fecha Fin Vigente", type: "date", description: "Con adendas" },
    { id: "estado", title: "Estado", type: "status" },
    { id: "proceso_adquisicion", title: "Proceso Adquisición", type: "connect_boards", description: "Link al proceso que lo originó" },
    { id: "categoria_financiera", title: "Categoría Financiera", type: "connect_boards", description: "Link a Gestión Financiera" },
    { id: "componente", title: "Componente", type: "dropdown" },
    { id: "responsable_supervision", title: "Responsable Supervisión", type: "people" },
    { id: "documentos", title: "Documentos", type: "file" },
  ],
  statusLabels: {
    estado: [
      { index: 0, label: "Vigente", color: "#00c875" },
      { index: 1, label: "En Enmienda", color: "#fdab3d" },
      { index: 2, label: "Suspendido", color: "#e2445c" },
      { index: 3, label: "Cerrado", color: "#c4c4c4" },
    ],
  },
};
