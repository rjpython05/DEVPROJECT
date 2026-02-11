import React from "react";
import type { ViewId } from "../App.js";

interface SidebarProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

const NAV_ITEMS: Array<{ id: ViewId; label: string; icon: string }> = [
  { id: "dashboard", label: "Dashboard Ejecutivo", icon: "||" },
  { id: "architecture", label: "Arquitectura Boards", icon: "[]" },
  { id: "schema", label: "Explorador de Schemas", icon: "{}" },
  { id: "automations", label: "Automatizaciones", icon: ">>" },
  { id: "provisioning", label: "Provisionar Workspace", icon: "+" },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  return (
    <aside
      style={{
        width: "240px",
        background: "var(--dp-dark)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "rgba(255,255,255,0.5)", marginBottom: "4px" }}>
          Sistema de Gestión
        </div>
        <div style={{ fontSize: "14px", fontWeight: 600 }}>
          Proyectos de Desarrollo
        </div>
      </div>

      <nav style={{ flex: 1, padding: "12px 8px" }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              width: "100%",
              padding: "10px 16px",
              marginBottom: "2px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: activeView === item.id ? "rgba(255,255,255,0.15)" : "transparent",
              color: activeView === item.id ? "white" : "rgba(255,255,255,0.7)",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              textAlign: "left",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontFamily: "monospace", fontSize: "14px", width: "20px", textAlign: "center" }}>
              {item.icon}
            </span>
            {item.label}
          </button>
        ))}
      </nav>

      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          fontSize: "11px",
          color: "rgba(255,255,255,0.4)",
        }}
      >
        8 Dominios PMI | 12 Principios
        <br />
        Monday.com App SDK
      </div>
    </aside>
  );
};
