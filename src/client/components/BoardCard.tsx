import React from "react";
import type { BoardDefinition } from "../../shared/types/monday.js";

interface BoardCardProps {
  board: BoardDefinition;
  onClick?: () => void;
}

const LEVEL_COLORS: Record<string, string> = {
  estrategico: "var(--dp-purple)",
  tactico: "var(--dp-primary)",
  operativo: "var(--dp-success)",
  reportes: "var(--dp-warning)",
};

const LEVEL_LABELS: Record<string, string> = {
  estrategico: "Estratégico",
  tactico: "Táctico",
  operativo: "Operativo",
  reportes: "Reportes",
};

export const BoardCard: React.FC<BoardCardProps> = ({ board, onClick }) => {
  const connectColumns = board.columns.filter((c) => c.type === "connect_boards");

  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        borderLeft: `4px solid ${LEVEL_COLORS[board.level]}`,
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 600 }}>{board.name}</h3>
        <span
          className="badge"
          style={{ background: LEVEL_COLORS[board.level], fontSize: "10px" }}
        >
          {LEVEL_LABELS[board.level]}
        </span>
      </div>

      <p style={{ fontSize: "12px", color: "var(--dp-gray)", marginBottom: "12px" }}>
        {board.description}
      </p>

      <div style={{ display: "flex", gap: "12px", fontSize: "12px", color: "var(--dp-gray)" }}>
        <span>{board.columns.length} columnas</span>
        <span>{board.groups.length} grupos</span>
        {connectColumns.length > 0 && (
          <span>{connectColumns.length} conexiones</span>
        )}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginTop: "8px" }}>
        {board.pmiDomains.map((domain) => (
          <span
            key={domain}
            style={{
              fontSize: "10px",
              padding: "1px 6px",
              background: "var(--dp-bg)",
              borderRadius: "8px",
              color: "var(--dp-gray)",
            }}
          >
            {domain}
          </span>
        ))}
      </div>
    </div>
  );
};
