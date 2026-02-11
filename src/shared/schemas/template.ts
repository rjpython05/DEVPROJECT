import type { WorkspaceTemplate } from "../types/monday.js";
import { ALL_BOARDS } from "./all-boards.js";
import { ALL_AUTOMATIONS } from "./automations.js";
import { BOARD_CONNECTIONS } from "./connections.js";

/**
 * Complete DevProject workspace template.
 * Used by the provisioning service to create a full project workspace.
 */
export const DEVPROJECT_TEMPLATE: WorkspaceTemplate = {
  name: "DevProject - Gestión de Proyectos de Desarrollo",
  description:
    "Sistema integral para Unidades Ejecutoras de Proyectos (UEP), " +
    "alineado al PMBOK® 7ma Edición. Cubre los 8 dominios de rendimiento " +
    "y 12 principios PMI para proyectos financiados por banca multilateral.",
  boards: ALL_BOARDS,
  automations: ALL_AUTOMATIONS,
  connections: BOARD_CONNECTIONS,
};
