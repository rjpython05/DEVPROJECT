import type { BoardDefinition } from "../../types/monday.js";

export const stakeholdersBoard: BoardDefinition = {
  key: "stakeholders",
  name: "Stakeholders y Comunicaciones",
  description: "Registro de interesados, engagement, plan de comunicaciones.",
  level: "tactico",
  pmiDomains: ["Stakeholders"],
  groups: [
    { id: "gestionar_cerca", title: "Gestionar de Cerca (Alta Influencia / Alto Interés)", color: "#e2445c" },
    { id: "mantener_satisfecho", title: "Mantener Satisfecho (Alta Influencia / Bajo Interés)", color: "#fdab3d" },
    { id: "mantener_informado", title: "Mantener Informado (Baja Influencia / Alto Interés)", color: "#579bfc" },
    { id: "monitorear", title: "Monitorear (Baja Influencia / Bajo Interés)", color: "#c4c4c4" },
  ],
  columns: [
    { id: "organizacion", title: "Organización", type: "text", description: "Entidad del stakeholder" },
    { id: "tipo", title: "Tipo", type: "dropdown", description: "Interno UEP / Institución / Financiador / Gobierno / Beneficiario" },
    { id: "influencia", title: "Influencia", type: "dropdown", description: "Alta / Media / Baja" },
    { id: "interes", title: "Interés", type: "dropdown", description: "Alto / Medio / Bajo" },
    { id: "estrategia_engagement", title: "Estrategia Engagement", type: "dropdown", description: "Gestionar Cerca / Satisfecho / Informado / Monitorear" },
    { id: "frecuencia", title: "Frecuencia Comunicación", type: "dropdown", description: "Semanal / Quincenal / Mensual / Trimestral" },
    { id: "canal", title: "Canal", type: "dropdown", description: "Email, Reunión, Informe, Dashboard" },
    { id: "proxima_comunicacion", title: "Próxima Comunicación", type: "date", description: "Programada según frecuencia" },
    { id: "responsable_relacion", title: "Responsable Relación", type: "people", description: "Quien gestiona la relación" },
    { id: "notas", title: "Notas", type: "long_text" },
    { id: "contacto_email", title: "Email Contacto", type: "email" },
    { id: "contacto_telefono", title: "Teléfono", type: "phone" },
  ],
};
