import type { AutomationDefinition } from "../types/monday.js";

/**
 * All 17 automation definitions from the DevProject architecture document.
 * These are implemented as integration recipes via the Monday.com Apps Framework.
 */
export const ALL_AUTOMATIONS: AutomationDefinition[] = [
  // === Pipeline de Aprobación ===
  {
    id: "A1",
    name: "WorkForm → Crear Item Pipeline",
    description: "WorkForm recibido → Crear item en Pipeline + Notificar Coordinador General",
    sourceBoard: "pipeline",
    trigger: { type: "item_created" },
    actions: [
      { type: "notify", params: { role: "Coordinador General", message: "Nuevo proyecto recibido en Pipeline: {item_name}" } },
    ],
  },
  {
    id: "A2",
    name: "Aprobado → Crear Proyecto",
    description: "Estado = Aprobado → Crear proyecto en Portafolio + Workspace desde template",
    sourceBoard: "pipeline",
    targetBoard: "portfolio",
    trigger: { type: "status_change", column: "estado_aprobacion", value: "Aprobado" },
    actions: [
      { type: "create_item", params: { targetBoard: "portfolio", group: "activos", copyColumns: ["sector", "fuente_financiamiento", "monto_estimado"] } },
      { type: "create_workspace", params: { template: "devproject_template" } },
    ],
  },
  {
    id: "A3",
    name: "Evaluación > 15 días → Escalamiento",
    description: "En Evaluación > 15 días → Escalamiento al Coordinador",
    sourceBoard: "pipeline",
    trigger: { type: "timer", column: "estado_aprobacion", value: "En Evaluación", days: 15 },
    actions: [
      { type: "notify", params: { role: "Coordinador General", message: "ALERTA: Proyecto {item_name} lleva más de 15 días en evaluación" } },
    ],
  },

  // === POA ===
  {
    id: "A4",
    name: "Fecha vencida → Retrasada",
    description: "Fecha vencida + Estado ≠ Completada → Estado = Retrasada + Notificar",
    sourceBoard: "poa",
    trigger: { type: "date_passed", column: "fecha_fin_plan" },
    actions: [
      { type: "change_status", params: { column: "estado", value: "Retrasada", condition: "estado != Completada" } },
      { type: "notify", params: { column: "responsable", message: "ALERTA: Actividad {item_name} está retrasada" } },
    ],
  },
  {
    id: "A5",
    name: "Completada → Actualizar Marco Lógico",
    description: "Completada → Avance = 100% + Actualizar Marco Lógico (cross-board)",
    sourceBoard: "poa",
    targetBoard: "marco_logico",
    trigger: { type: "status_change", column: "estado", value: "Completada" },
    actions: [
      { type: "set_value", params: { column: "pct_avance", value: 100 } },
      { type: "update_connected", params: { targetBoard: "marco_logico", recalculate: "pct_cumplimiento" } },
    ],
  },
  {
    id: "A6",
    name: "Viernes → Solicitar actualización",
    description: "Cada viernes → Solicitar actualización a responsables con actividades en progreso",
    sourceBoard: "poa",
    trigger: { type: "recurring", schedule: "every_friday" },
    actions: [
      { type: "notify", params: { filter: "estado = En Progreso", column: "responsable", message: "Recordatorio semanal: Por favor actualiza el avance de {item_name}" } },
    ],
  },
  {
    id: "A7",
    name: "Asignar proceso → Sincronizar",
    description: "Asignar Proceso Adquisición → Sincronizar fechas con Plan de Adquisiciones",
    sourceBoard: "poa",
    targetBoard: "plan_adquisiciones",
    trigger: { type: "column_change", column: "proceso_adquisicion" },
    actions: [
      { type: "sync_dates", params: { targetBoard: "plan_adquisiciones", sourceDate: "fecha_inicio_plan", targetDate: "fecha_inicio" } },
    ],
  },

  // === Plan de Adquisiciones ===
  {
    id: "A8",
    name: "No Objeción → Notificar",
    description: "Etapa = No Objeción → Notificar Coordinador + crear tarea de envío al financiador",
    sourceBoard: "plan_adquisiciones",
    trigger: { type: "status_change", column: "etapa_actual", value: "No Obj. TdR" },
    actions: [
      { type: "notify", params: { role: "Coordinador General", message: "Proceso {item_name} requiere No Objeción del financiador" } },
      { type: "notify", params: { role: "Especialista Adquisiciones", message: "Preparar documentación para No Objeción: {item_name}" } },
    ],
  },
  {
    id: "A9",
    name: "Días en etapa > umbral → Escalamiento",
    description: "Días en Etapa > umbral → Escalamiento automático (Amarillo→Rojo)",
    sourceBoard: "plan_adquisiciones",
    trigger: { type: "formula_threshold", column: "dias_en_etapa", threshold: 30 },
    actions: [
      { type: "change_status", params: { column: "alerta_retraso", value: "Rojo" } },
      { type: "notify", params: { role: "Coordinador General", message: "ALERTA CRÍTICA: Proceso {item_name} lleva {dias_en_etapa} días en etapa actual" } },
    ],
  },
  {
    id: "A10",
    name: "Firma contrato → Crear en Contratos",
    description: "Firma Contrato → Crear item en Gestión de Contratos",
    sourceBoard: "plan_adquisiciones",
    targetBoard: "contratos",
    trigger: { type: "status_change", column: "etapa_actual", value: "Firma" },
    actions: [
      { type: "create_item", params: { targetBoard: "contratos", group: "vigentes", copyColumns: ["codigo_proceso", "contratista", "monto_adjudicado"] } },
    ],
  },
  {
    id: "A11",
    name: "Cerrado → Actualizar POA y Finanzas",
    description: "Cerrado → Actualizar POA + registrar monto en Gestión Financiera",
    sourceBoard: "plan_adquisiciones",
    targetBoard: "gestion_financiera",
    trigger: { type: "status_change", column: "etapa_actual", value: "Cerrado" },
    actions: [
      { type: "update_connected", params: { targetBoard: "poa", column: "estado", value: "Completada" } },
      { type: "update_connected", params: { targetBoard: "gestion_financiera", column: "pagado", operation: "add" } },
    ],
  },

  // === Registro de Riesgos ===
  {
    id: "A12",
    name: "Riesgo Crítico → Notificar + Issue",
    description: "Prioridad Crítica → Notificar Coordinador + crear Issue si materializado",
    sourceBoard: "registro_riesgos",
    targetBoard: "issues_cambios",
    trigger: { type: "status_change", column: "estado", value: "Materializado" },
    actions: [
      { type: "notify", params: { role: "Coordinador General", message: "RIESGO MATERIALIZADO: {item_name}" } },
      { type: "create_item", params: { targetBoard: "issues_cambios", group: "issues_abiertos", copyColumns: ["descripcion", "responsable"] } },
    ],
  },
  {
    id: "A13",
    name: "Cada 30 días → Revisión riesgos",
    description: "Cada 30 días → Solicitar revisión de riesgos abiertos",
    sourceBoard: "registro_riesgos",
    trigger: { type: "recurring", schedule: "every_30_days" },
    actions: [
      { type: "notify", params: { filter: "estado = Abierto OR estado = En Mitigación", column: "responsable", message: "Recordatorio: Revise el riesgo {item_name}. Última revisión hace más de 30 días." } },
    ],
  },
  {
    id: "A14",
    name: "Revisión > 60 días → Alerta",
    description: "Última revisión > 60 días → Alerta y escalamiento",
    sourceBoard: "registro_riesgos",
    trigger: { type: "date_passed", column: "ultima_revision" },
    actions: [
      { type: "notify", params: { role: "Coordinador General", message: "ESCALAMIENTO: Riesgo {item_name} sin revisión por más de 60 días" } },
    ],
  },

  // === Stakeholders y Comunicaciones ===
  {
    id: "A15",
    name: "Próxima comunicación en 3 días → Notificar",
    description: "Próxima Comunicación en 3 días → Notificar responsable",
    sourceBoard: "stakeholders",
    trigger: { type: "date_approaching", column: "proxima_comunicacion", days: 3 },
    actions: [
      { type: "notify", params: { column: "responsable_relacion", message: "Recordatorio: Comunicación programada con {item_name} en 3 días" } },
    ],
  },
  {
    id: "A16",
    name: "Hito completado → Notificar stakeholders",
    description: "Hito completado en POA → Notificar stakeholders de alta influencia",
    sourceBoard: "poa",
    targetBoard: "stakeholders",
    trigger: { type: "status_change", column: "estado", value: "Completada" },
    actions: [
      { type: "notify_stakeholders", params: { filter: "influencia = Alta", message: "Hito completado: {item_name}" } },
    ],
  },
  {
    id: "A17",
    name: "Reporte mensual automático",
    description: "Reporte mensual compilado automáticamente desde todos los boards",
    sourceBoard: "panel_general",
    trigger: { type: "recurring", schedule: "first_monday_monthly" },
    actions: [
      { type: "generate_report", params: { boards: ["marco_logico", "poa", "plan_adquisiciones", "gestion_financiera", "registro_riesgos"], recipients: "stakeholders_alta_influencia" } },
    ],
  },
];
