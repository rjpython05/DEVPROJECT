import { ApiClient } from "@mondaydotcomorg/api";
import type { ColumnDefinition, GroupDefinition } from "../../shared/types/monday.js";

/**
 * Monday.com GraphQL API service.
 * Uses the official @mondaydotcomorg/api client for all API communication.
 */
export class MondayApiService {
  private client: ApiClient;

  constructor(token: string) {
    this.client = new ApiClient({ token, apiVersion: "2025-07" });
  }

  async query<T = unknown>(graphql: string, variables?: Record<string, unknown>): Promise<T> {
    return await this.client.request<T>(graphql, variables);
  }

  // ── Workspace ──

  async createWorkspace(name: string, description: string): Promise<{ id: string; name: string }> {
    const data = await this.query<{ create_workspace: { id: string; name: string } }>(`
      mutation ($name: String!, $description: String) {
        create_workspace(name: $name, kind: open, description: $description) {
          id
          name
        }
      }
    `, { name, description });
    return data.create_workspace;
  }

  // ── Boards ──

  async createBoard(
    name: string,
    workspaceId: string,
    kind: "public" | "private" | "share" = "public"
  ): Promise<{ id: string; name: string }> {
    const data = await this.query<{ create_board: { id: string; name: string } }>(`
      mutation ($name: String!, $kind: BoardKind!, $workspaceId: ID!) {
        create_board(board_name: $name, board_kind: $kind, workspace_id: $workspaceId, empty: true) {
          id
          name
        }
      }
    `, { name, kind, workspaceId: Number(workspaceId) });
    return data.create_board;
  }

  async getBoard(boardId: string): Promise<{
    id: string;
    name: string;
    columns: Array<{ id: string; title: string; type: string }>;
    groups: Array<{ id: string; title: string }>;
  }> {
    const data = await this.query<{ boards: Array<{ id: string; name: string; columns: Array<{ id: string; title: string; type: string }>; groups: Array<{ id: string; title: string }> }> }>(`
      query ($ids: [ID!]!) {
        boards(ids: $ids) {
          id
          name
          columns { id title type }
          groups { id title }
        }
      }
    `, { ids: [Number(boardId)] });
    return data.boards[0];
  }

  // ── Columns ──

  async createColumn(
    boardId: string,
    column: ColumnDefinition
  ): Promise<{ id: string; title: string }> {
    const data = await this.query<{ create_column: { id: string; title: string } }>(`
      mutation ($boardId: ID!, $title: String!, $columnType: ColumnType!, $description: String) {
        create_column(board_id: $boardId, title: $title, column_type: $columnType, description: $description) {
          id
          title
        }
      }
    `, {
      boardId: Number(boardId),
      title: column.title,
      columnType: column.type,
      description: column.description || "",
    });
    return data.create_column;
  }

  // ── Groups ──

  async createGroup(
    boardId: string,
    group: GroupDefinition
  ): Promise<{ id: string; title: string }> {
    const data = await this.query<{ create_group: { id: string; title: string } }>(`
      mutation ($boardId: ID!, $groupName: String!) {
        create_group(board_id: $boardId, group_name: $groupName) {
          id
          title
        }
      }
    `, { boardId: Number(boardId), groupName: group.title });
    return data.create_group;
  }

  // ── Items ──

  async createItem(
    boardId: string,
    groupId: string,
    itemName: string,
    columnValues?: Record<string, unknown>
  ): Promise<{ id: string; name: string }> {
    const data = await this.query<{ create_item: { id: string; name: string } }>(`
      mutation ($boardId: ID!, $groupId: String!, $itemName: String!, $columnValues: JSON) {
        create_item(board_id: $boardId, group_id: $groupId, item_name: $itemName, column_values: $columnValues) {
          id
          name
        }
      }
    `, {
      boardId: Number(boardId),
      groupId,
      itemName,
      columnValues: columnValues ? JSON.stringify(columnValues) : undefined,
    });
    return data.create_item;
  }

  async updateColumnValue(
    boardId: string,
    itemId: string,
    columnId: string,
    value: string
  ): Promise<{ id: string }> {
    const data = await this.query<{ change_column_value: { id: string } }>(`
      mutation ($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
    `, { boardId: Number(boardId), itemId: Number(itemId), columnId, value });
    return data.change_column_value;
  }

  // ── Board Items Query ──

  async getBoardItems(
    boardId: string,
    limit = 100
  ): Promise<Array<{ id: string; name: string; column_values: Array<{ id: string; text: string; value: string | null }> }>> {
    const data = await this.query<{ boards: Array<{ items_page: { items: Array<{ id: string; name: string; column_values: Array<{ id: string; text: string; value: string | null }> }> } }> }>(`
      query ($ids: [ID!]!, $limit: Int!) {
        boards(ids: $ids) {
          items_page(limit: $limit) {
            items {
              id
              name
              column_values { id text value }
            }
          }
        }
      }
    `, { ids: [Number(boardId)], limit });
    return data.boards[0]?.items_page?.items ?? [];
  }

  // ── Users ──

  async getCurrentUser(): Promise<{ id: string; name: string; email: string }> {
    const data = await this.query<{ me: { id: string; name: string; email: string } }>(`
      query { me { id name email } }
    `);
    return data.me;
  }

  // ── Workspaces ──

  async getWorkspaces(): Promise<Array<{ id: string; name: string }>> {
    const data = await this.query<{ workspaces: Array<{ id: string; name: string }> }>(`
      query { workspaces { id name } }
    `);
    return data.workspaces;
  }
}
