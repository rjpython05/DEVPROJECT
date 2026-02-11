/** DevProject domain types aligned with PMBOK 7th Edition */

export type ProjectPhase =
  | "formulacion"
  | "negociacion"
  | "inicio"
  | "ejecucion"
  | "cierre"
  | "ex_post";

export type FundingSource =
  | "BID"
  | "Banco Mundial"
  | "CAF"
  | "AECID"
  | "UE"
  | "USAID"
  | "Nacional"
  | "Mixto";

export type Sector =
  | "Educación"
  | "Salud"
  | "Infraestructura"
  | "Agricultura"
  | "Energía"
  | "Gobernanza";

export type ApprovalStatus =
  | "Recibido"
  | "En Evaluación"
  | "Aprobado"
  | "Rechazado"
  | "En Negociación";

export type ProcurementMethod =
  | "LPI"
  | "LPN"
  | "SBCC"
  | "SBC"
  | "SBQ"
  | "SBMC"
  | "CD"
  | "Comparación Precios"
  | "Directa";

export type ProcurementStage =
  | "Planificado"
  | "TdR"
  | "No Obj. TdR"
  | "Publicación"
  | "Ofertas"
  | "Evaluación"
  | "No Obj. Informe"
  | "Adjudicación"
  | "Firma"
  | "Ejecución"
  | "Cerrado";

export type RiskCategory =
  | "Fiduciario"
  | "Técnico"
  | "Ambiental"
  | "Social"
  | "Político"
  | "Adquisiciones";

export type RiskStrategy =
  | "Evitar"
  | "Mitigar"
  | "Transferir"
  | "Aceptar"
  | "Escalar";

export type LogicalFrameworkLevel =
  | "Fin"
  | "Propósito"
  | "Resultado"
  | "Actividad";

export type StakeholderType =
  | "Interno UEP"
  | "Institución"
  | "Financiador"
  | "Gobierno"
  | "Beneficiario";

export type ContractType =
  | "Suma Alzada"
  | "Precio Unitario"
  | "T&M"
  | "Costo Reembolsable";

export type UEPRole =
  | "Coordinador General"
  | "Especialista Financiero"
  | "Especialista Planificación"
  | "Especialista Adquisiciones"
  | "Coordinador Componente"
  | "Personal Administrativo"
  | "Enlace Institucional"
  | "Organismo Financiador"
  | "Ente Rector"
  | "Beneficiario";

export interface PMIDomain {
  id: number;
  name: string;
  description: string;
}

export const PMI_DOMAINS: PMIDomain[] = [
  { id: 1, name: "Stakeholders", description: "Donantes, gobierno, institución, comunidades, proveedores" },
  { id: 2, name: "Equipo", description: "Coordinador, Especialistas, Coord. Componente, Administrativos, Enlaces" },
  { id: 3, name: "Ciclo de Vida", description: "Fases: Formulación → Negociación → Inicio → Ejecución → Cierre → Ex-Post" },
  { id: 4, name: "Planificación", description: "POA, Marco Lógico, Plan Adquisiciones, Plan Financiero, Cronograma" },
  { id: 5, name: "Trabajo", description: "Ejecución por componente, contratos, calidad" },
  { id: 6, name: "Entrega", description: "Productos vinculados a resultados, aceptación financiador" },
  { id: 7, name: "Medición", description: "KPIs, EVM, ejecución presupuestaria, avance físico vs financiero" },
  { id: 8, name: "Incertidumbre", description: "Riesgos fiduciarios/ambientales/sociales/políticos, issues" },
];
