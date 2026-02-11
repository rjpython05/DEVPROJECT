import React from "react";

interface HeaderProps {
  mondayContext: Record<string, unknown> | null;
}

export const Header: React.FC<HeaderProps> = ({ mondayContext }) => {
  return (
    <header
      style={{
        background: "white",
        borderBottom: "1px solid var(--dp-border)",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <h1 style={{ fontSize: "20px", fontWeight: 700, color: "var(--dp-dark)" }}>
          DevProject
        </h1>
        <span
          style={{
            fontSize: "11px",
            padding: "2px 8px",
            background: "var(--dp-primary)",
            color: "white",
            borderRadius: "10px",
            fontWeight: 600,
          }}
        >
          PMBOK 7
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {mondayContext && (
          <span style={{ fontSize: "12px", color: "var(--dp-gray)" }}>
            Monday.com conectado
          </span>
        )}
        <span style={{ fontSize: "12px", color: "var(--dp-gray)" }}>
          v1.0.0
        </span>
      </div>
    </header>
  );
};
