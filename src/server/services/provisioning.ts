import type { BoardDefinition, BoardConnection } from "../../shared/types/monday.js";
import { ALL_BOARDS } from "../../shared/schemas/all-boards.js";
import { BOARD_CONNECTIONS } from "../../shared/schemas/connections.js";
import { MondayApiService } from "./monday-api.js";

export interface ProvisioningResult {
  workspaceId: string;
  workspaceName: string;
  boards: Array<{
    key: string;
    boardId: string;
    name: string;
    columnsCreated: number;
    groupsCreated: number;
  }>;
  connectionsCreated: number;
  errors: string[];
}

export interface ProvisioningProgress {
  phase: string;
  step: string;
  current: number;
  total: number;
}

type ProgressCallback = (progress: ProvisioningProgress) => void;

/**
 * Provisioning service that creates a complete DevProject workspace
 * with all boards, columns, groups, and cross-board connections.
 */
export class ProvisioningService {
  private api: MondayApiService;
  private boardIdMap: Map<string, string> = new Map();

  constructor(apiToken: string) {
    this.api = new MondayApiService(apiToken);
  }

  /**
   * Provision a complete DevProject workspace.
   * @param projectName - Name for the workspace
   * @param numComponents - Number of component boards to create (1-N)
   * @param onProgress - Optional callback for progress updates
   */
  async provisionWorkspace(
    projectName: string,
    numComponents: number = 1,
    onProgress?: ProgressCallback
  ): Promise<ProvisioningResult> {
    const result: ProvisioningResult = {
      workspaceId: "",
      workspaceName: "",
      boards: [],
      connectionsCreated: 0,
      errors: [],
    };

    const totalSteps = ALL_BOARDS.length + numComponents - 1; // -1 because componenteBoard is a template

    try {
      // Phase 1: Create workspace
      onProgress?.({ phase: "workspace", step: "Creando workspace...", current: 0, total: totalSteps });

      const workspace = await this.api.createWorkspace(
        `DevProject - ${projectName}`,
        `Workspace del proyecto: ${projectName}. Sistema DevProject (PMBOK 7ma Edición).`
      );
      result.workspaceId = workspace.id;
      result.workspaceName = workspace.name;

      // Phase 2: Create boards with columns and groups
      let boardIndex = 0;
      for (const boardDef of ALL_BOARDS) {
        if (boardDef.key === "componente") {
          // Create N component boards
          for (let i = 1; i <= numComponents; i++) {
            boardIndex++;
            onProgress?.({
              phase: "boards",
              step: `Creando board: Componente ${i}...`,
              current: boardIndex,
              total: totalSteps,
            });

            try {
              const boardResult = await this.createBoardFromDefinition(
                { ...boardDef, name: `Componente ${i}`, key: `componente_${i}` },
                workspace.id
              );
              result.boards.push(boardResult);
              this.boardIdMap.set(`componente_${i}`, boardResult.boardId);
            } catch (err) {
              result.errors.push(`Error creating Componente ${i}: ${(err as Error).message}`);
            }
          }
        } else {
          boardIndex++;
          onProgress?.({
            phase: "boards",
            step: `Creando board: ${boardDef.name}...`,
            current: boardIndex,
            total: totalSteps,
          });

          try {
            const boardResult = await this.createBoardFromDefinition(boardDef, workspace.id);
            result.boards.push(boardResult);
            this.boardIdMap.set(boardDef.key, boardResult.boardId);
          } catch (err) {
            result.errors.push(`Error creating ${boardDef.name}: ${(err as Error).message}`);
          }
        }
      }

      // Phase 3: Create cross-board connections
      onProgress?.({
        phase: "connections",
        step: "Configurando conexiones cross-board...",
        current: totalSteps,
        total: totalSteps,
      });

      result.connectionsCreated = await this.createConnections(BOARD_CONNECTIONS, result.errors);

    } catch (err) {
      result.errors.push(`Critical error: ${(err as Error).message}`);
    }

    return result;
  }

  private async createBoardFromDefinition(
    boardDef: BoardDefinition,
    workspaceId: string
  ): Promise<{
    key: string;
    boardId: string;
    name: string;
    columnsCreated: number;
    groupsCreated: number;
  }> {
    // Create the board
    const board = await this.api.createBoard(boardDef.name, workspaceId);

    let columnsCreated = 0;
    let groupsCreated = 0;

    // Create groups (skip connect_boards type for now, will link later)
    for (const group of boardDef.groups) {
      try {
        await this.api.createGroup(board.id, group);
        groupsCreated++;
      } catch (err) {
        // Groups may fail if name already exists; continue
        console.warn(`Group creation warning for ${group.title}: ${(err as Error).message}`);
      }
    }

    // Create columns (skip connect_boards, will be created during connections phase)
    for (const column of boardDef.columns) {
      if (column.type === "connect_boards") continue;
      try {
        await this.api.createColumn(board.id, column);
        columnsCreated++;
      } catch (err) {
        console.warn(`Column creation warning for ${column.title}: ${(err as Error).message}`);
      }
    }

    return {
      key: boardDef.key,
      boardId: board.id,
      name: boardDef.name,
      columnsCreated,
      groupsCreated,
    };
  }

  private async createConnections(
    connections: BoardConnection[],
    errors: string[]
  ): Promise<number> {
    let created = 0;

    for (const conn of connections) {
      const sourceBoardId = this.boardIdMap.get(conn.sourceBoard);
      const targetBoardId = this.boardIdMap.get(conn.targetBoard);

      if (!sourceBoardId || !targetBoardId) {
        // For component boards, try componente_1 as fallback
        const sourceId = sourceBoardId || this.boardIdMap.get(`${conn.sourceBoard}_1`);
        const targetId = targetBoardId || this.boardIdMap.get(`${conn.targetBoard}_1`);

        if (!sourceId || !targetId) {
          errors.push(`Connection skipped: ${conn.sourceBoard} → ${conn.targetBoard} (board not found)`);
          continue;
        }
      }

      try {
        // Create connect_boards column on the source board
        await this.api.query(`
          mutation ($boardId: ID!, $title: String!, $boardIdsToConnect: [ID!]!) {
            create_column(
              board_id: $boardId,
              title: $title,
              column_type: board_relation,
              defaults: $boardIdsToConnect
            ) {
              id
              title
            }
          }
        `, {
          boardId: Number(sourceBoardId),
          title: conn.description.substring(0, 50),
          boardIdsToConnect: [Number(targetBoardId)],
        });
        created++;
      } catch (err) {
        errors.push(`Connection error ${conn.sourceBoard} → ${conn.targetBoard}: ${(err as Error).message}`);
      }
    }

    return created;
  }

  /** Get the mapping of board keys to Monday.com board IDs after provisioning */
  getBoardIdMap(): Map<string, string> {
    return new Map(this.boardIdMap);
  }
}
