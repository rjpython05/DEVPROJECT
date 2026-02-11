import type { BoardDefinition } from "../types/monday.js";
import { pipelineBoard } from "./boards/pipeline.js";
import { portfolioBoard } from "./boards/portfolio.js";
import { panelGeneralBoard } from "./boards/panel-general.js";
import { marcoLogicoBoard } from "./boards/marco-logico.js";
import { poaBoard } from "./boards/poa.js";
import { planAdquisicionesBoard } from "./boards/plan-adquisiciones.js";
import { gestionFinancieraBoard } from "./boards/gestion-financiera.js";
import { registroRiesgosBoard } from "./boards/registro-riesgos.js";
import { stakeholdersBoard } from "./boards/stakeholders.js";
import { componenteBoard } from "./boards/componente.js";
import { contratosBoard } from "./boards/contratos.js";
import { issuesCambiosBoard } from "./boards/issues-cambios.js";
import { leccionesAprendidasBoard } from "./boards/lecciones-aprendidas.js";

/**
 * All board definitions organized by level (3-tier architecture):
 * - Estratégico: Vista ejecutiva y entrada
 * - Táctico: Planificación y gestión
 * - Operativo: Ejecución diaria
 */
export const ALL_BOARDS: BoardDefinition[] = [
  // Nivel Estratégico
  portfolioBoard,
  pipelineBoard,
  // Nivel Táctico
  panelGeneralBoard,
  marcoLogicoBoard,
  poaBoard,
  planAdquisicionesBoard,
  gestionFinancieraBoard,
  registroRiesgosBoard,
  stakeholdersBoard,
  // Nivel Operativo
  componenteBoard,
  contratosBoard,
  issuesCambiosBoard,
  leccionesAprendidasBoard,
];

export const BOARDS_BY_LEVEL = {
  estrategico: ALL_BOARDS.filter((b) => b.level === "estrategico"),
  tactico: ALL_BOARDS.filter((b) => b.level === "tactico"),
  operativo: ALL_BOARDS.filter((b) => b.level === "operativo"),
};

export const BOARD_MAP = new Map<string, BoardDefinition>(
  ALL_BOARDS.map((b) => [b.key, b])
);
