import React, { useState } from "react";
import { ALL_BOARDS, BOARDS_BY_LEVEL } from "../../shared/schemas/all-boards.js";
import type { BoardDefinition, ColumnDefinition } from "../../shared/types/monday.js";

const COLUMN_TYPE_COLORS: Record<string, string> = {
  text: "#579bfc",
  long_text: "#579bfc",
  numbers: "#00c875",
  status: "#fdab3d",
  date: "#a25ddc",
  people: "#ff642e",
  dropdown: "#0086c0",
  file: "#c4c4c4",
  formula: "#e2445c",
  dependency: "#333333",
  connect_boards: "#037f4c",
  mirror: "#037f4c",
  email: "#579bfc",
  phone: "#579bfc",
};

export const SchemaExplorerView: React.FC = () => {
  const [selectedBoard, setSelectedBoard] = useState<BoardDefinition | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>("all");

  const filteredBoards =
    filterLevel === "all"
      ? ALL_BOARDS
      : ALL_BOARDS.filter((b) => b.level === filterLevel);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>
          Explorador de Schemas
        </h2>
        <p style={{ color: "var(--dp-gray)", fontSize: "13px" }}>
          {ALL_BOARDS.length} boards |{" "}
          {ALL_BOARDS.reduce((sum, b) => sum + b.columns.length, 0)} columnas totales |{" "}
          {ALL_BOARDS.reduce((sum, b) => sum + b.groups.length, 0)} grupos
        </p>
      </div>

      {/* Filters */}
      <div className="nav-tabs">
        {[
          { id: "all", label: `Todos (${ALL_BOARDS.length})` },
          { id: "estrategico", label: `Estratégico (${BOARDS_BY_LEVEL.estrategico.length})` },
          { id: "tactico", label: `Táctico (${BOARDS_BY_LEVEL.tactico.length})` },
          { id: "operativo", label: `Operativo (${BOARDS_BY_LEVEL.operativo.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`nav-tab ${filterLevel === tab.id ? "nav-tab--active" : ""}`}
            onClick={() => {
              setFilterLevel(tab.id);
              setSelectedBoard(null);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "16px" }}>
        {/* Board List */}
        <div style={{ width: "300px", flexShrink: 0 }}>
          {filteredBoards.map((board) => (
            <div
              key={board.key}
              onClick={() => setSelectedBoard(board)}
              className="card"
              style={{
                cursor: "pointer",
                borderLeft: `3px solid ${
                  selectedBoard?.key === board.key
                    ? "var(--dp-primary)"
                    : "transparent"
                }`,
                padding: "12px 16px",
                background:
                  selectedBoard?.key === board.key
                    ? "#f0f3ff"
                    : "white",
              }}
            >
              <div style={{ fontWeight: 600, fontSize: "13px" }}>{board.name}</div>
              <div style={{ fontSize: "11px", color: "var(--dp-gray)" }}>
                {board.columns.length} cols | {board.groups.length} grupos | {board.pmiDomains.join(", ")}
              </div>
            </div>
          ))}
        </div>

        {/* Board Detail */}
        <div style={{ flex: 1 }}>
          {selectedBoard ? (
            <BoardDetail board={selectedBoard} />
          ) : (
            <div className="card" style={{ textAlign: "center", padding: "48px", color: "var(--dp-gray)" }}>
              Selecciona un board para ver su schema completo
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const BoardDetail: React.FC<{ board: BoardDefinition }> = ({ board }) => {
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2>{board.name}</h2>
          <span className="badge badge--blue">{board.key}</span>
        </div>
        <p style={{ fontSize: "13px", color: "var(--dp-gray)", marginBottom: "16px" }}>
          {board.description}
        </p>

        <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
          {board.pmiDomains.map((d) => (
            <span key={d} className="badge badge--purple" style={{ fontSize: "11px" }}>
              {d}
            </span>
          ))}
        </div>
      </div>

      {/* Groups */}
      <div className="card">
        <div className="card-header">
          <h2>Grupos ({board.groups.length})</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {board.groups.map((g) => (
            <span
              key={g.id}
              style={{
                padding: "4px 12px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: 500,
                background: g.color || "var(--dp-bg)",
                color: "white",
              }}
            >
              {g.title}
            </span>
          ))}
        </div>
      </div>

      {/* Columns */}
      <div className="card">
        <div className="card-header">
          <h2>Columnas ({board.columns.length})</h2>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Tipo</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {board.columns.map((col: ColumnDefinition) => (
              <tr key={col.id}>
                <td>
                  <code style={{ fontSize: "11px", color: "var(--dp-gray)" }}>{col.id}</code>
                </td>
                <td style={{ fontWeight: 500 }}>{col.title}</td>
                <td>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "1px 8px",
                      borderRadius: "10px",
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "white",
                      background: COLUMN_TYPE_COLORS[col.type] || "#c4c4c4",
                    }}
                  >
                    {col.type}
                  </span>
                </td>
                <td style={{ fontSize: "12px", color: "var(--dp-gray)" }}>
                  {col.description || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Labels */}
      {board.statusLabels && Object.keys(board.statusLabels).length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2>Status Labels</h2>
          </div>
          {Object.entries(board.statusLabels).map(([columnId, labels]) => (
            <div key={columnId} style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, marginBottom: "6px" }}>
                {columnId}:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                {labels.map((label) => (
                  <span
                    key={label.index}
                    style={{
                      padding: "2px 10px",
                      borderRadius: "10px",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "white",
                      background: label.color || "#c4c4c4",
                    }}
                  >
                    {label.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
