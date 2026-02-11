/** Monday.com column types supported by the API */
export type MondayColumnType =
  | "text"
  | "long_text"
  | "numbers"
  | "status"
  | "date"
  | "people"
  | "dropdown"
  | "file"
  | "formula"
  | "dependency"
  | "connect_boards"
  | "mirror"
  | "color"
  | "checkbox"
  | "link"
  | "timeline"
  | "rating"
  | "phone"
  | "email"
  | "country"
  | "auto_number";

export interface ColumnDefinition {
  id: string;
  title: string;
  type: MondayColumnType;
  description?: string;
  defaults?: Record<string, unknown>;
}

export interface GroupDefinition {
  id: string;
  title: string;
  color?: string;
}

export interface StatusLabel {
  index: number;
  label: string;
  color?: string;
}

export interface BoardDefinition {
  key: string;
  name: string;
  description: string;
  level: "estrategico" | "tactico" | "operativo" | "reportes";
  pmiDomains: string[];
  groups: GroupDefinition[];
  columns: ColumnDefinition[];
  statusLabels?: Record<string, StatusLabel[]>;
}

export interface AutomationDefinition {
  id: string;
  name: string;
  description: string;
  sourceBoard: string;
  targetBoard?: string;
  trigger: {
    type: string;
    column?: string;
    value?: string;
    schedule?: string;
  };
  actions: {
    type: string;
    params: Record<string, unknown>;
  }[];
}

export interface WorkspaceTemplate {
  name: string;
  description: string;
  boards: BoardDefinition[];
  automations: AutomationDefinition[];
  connections: BoardConnection[];
}

export interface BoardConnection {
  sourceBoard: string;
  sourceColumn: string;
  targetBoard: string;
  description: string;
}
