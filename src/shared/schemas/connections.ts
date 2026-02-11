import type { BoardConnection } from "../types/monday.js";

/**
 * Cross-board connections (Connect Boards columns).
 * Each connection defines a link between two boards via a connect_boards column.
 */
export const BOARD_CONNECTIONS: BoardConnection[] = [
  // Marco Lógico ↔ POA
  {
    sourceBoard: "poa",
    sourceColumn: "resultado_vinculado",
    targetBoard: "marco_logico",
    description: "Cada actividad del POA se vincula al resultado del Marco Lógico que impacta",
  },
  // POA ↔ Plan Adquisiciones
  {
    sourceBoard: "poa",
    sourceColumn: "proceso_adquisicion",
    targetBoard: "plan_adquisiciones",
    description: "Actividades que requieren adquisición se vinculan al proceso correspondiente",
  },
  // Plan Adquisiciones → Contratos
  {
    sourceBoard: "plan_adquisiciones",
    sourceColumn: "contrato_generado",
    targetBoard: "contratos",
    description: "Proceso de adquisición genera contrato al llegar a firma",
  },
  // Plan Adquisiciones ↔ POA
  {
    sourceBoard: "plan_adquisiciones",
    sourceColumn: "actividad_poa",
    targetBoard: "poa",
    description: "Proceso se vincula a la actividad del POA que lo originó",
  },
  // Contratos ↔ Plan Adquisiciones
  {
    sourceBoard: "contratos",
    sourceColumn: "proceso_adquisicion",
    targetBoard: "plan_adquisiciones",
    description: "Cada contrato se vincula al proceso de adquisición que lo originó",
  },
  // Contratos ↔ Gestión Financiera
  {
    sourceBoard: "contratos",
    sourceColumn: "categoria_financiera",
    targetBoard: "gestion_financiera",
    description: "Cada contrato se vincula a la categoría financiera correspondiente",
  },
  // Gestión Financiera ↔ Contratos
  {
    sourceBoard: "gestion_financiera",
    sourceColumn: "contratos_asociados",
    targetBoard: "contratos",
    description: "Cada línea presupuestaria muestra los contratos asociados",
  },
  // Gestión Financiera ↔ Marco Lógico (trazabilidad pago→producto)
  {
    sourceBoard: "gestion_financiera",
    sourceColumn: "productos_vinculados",
    targetBoard: "marco_logico",
    description: "Trazabilidad pago→producto: cada desembolso se vincula al resultado del Marco Lógico",
  },
  // Registro Riesgos ↔ Marco Lógico
  {
    sourceBoard: "registro_riesgos",
    sourceColumn: "marco_logico",
    targetBoard: "marco_logico",
    description: "Cada riesgo se vincula al resultado del Marco Lógico que puede afectar",
  },
  // Registro Riesgos ↔ Issues
  {
    sourceBoard: "registro_riesgos",
    sourceColumn: "issue_generado",
    targetBoard: "issues_cambios",
    description: "Riesgo materializado genera issue",
  },
  // Marco Lógico ↔ Riesgos
  {
    sourceBoard: "marco_logico",
    sourceColumn: "supuestos_riesgos",
    targetBoard: "registro_riesgos",
    description: "Supuestos y riesgos vinculados a cada nivel del Marco Lógico",
  },
  // Componente ↔ POA
  {
    sourceBoard: "componente",
    sourceColumn: "actividad_poa",
    targetBoard: "poa",
    description: "Tareas del componente se vinculan a actividades del POA",
  },
  // Componente ↔ Marco Lógico
  {
    sourceBoard: "componente",
    sourceColumn: "resultado_ml",
    targetBoard: "marco_logico",
    description: "Tareas se vinculan al resultado del Marco Lógico que impactan",
  },
  // Issues ↔ Riesgos
  {
    sourceBoard: "issues_cambios",
    sourceColumn: "riesgo_origen",
    targetBoard: "registro_riesgos",
    description: "Issues originados desde riesgos materializados",
  },
  // Lecciones ↔ Issues
  {
    sourceBoard: "lecciones_aprendidas",
    sourceColumn: "issue_relacionado",
    targetBoard: "issues_cambios",
    description: "Lecciones aprendidas vinculadas a issues específicos",
  },
];
