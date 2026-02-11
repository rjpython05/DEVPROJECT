import React, { useState } from "react";
import { ALL_AUTOMATIONS } from "../../shared/schemas/automations.js";
import type { AutomationDefinition } from "../../shared/types/monday.js";

const BOARD_LABELS: Record<string, string> = {
  pipeline: "Pipeline de Aprobación",
  portfolio: "Portafolio",
  panel_general: "Panel General",
  marco_logico: "Marco Lógico",
  poa: "POA",
  plan_adquisiciones: "Plan de Adquisiciones",
  gestion_financiera: "Gestión Financiera",
  registro_riesgos: "Registro de Riesgos",
  stakeholders: "Stakeholders",
  contratos: "Contratos",
  issues_cambios: "Issues y Cambios",
};

const TRIGGER_TYPE_LABELS: Record<string, string> = {
  status_change: "Cambio de Status",
  item_created: "Item Creado",
  date_passed: "Fecha Vencida",
  date_approaching: "Fecha Próxima",
  column_change: "Cambio de Columna",
  timer: "Timer (días en estado)",
  formula_threshold: "Umbral de Fórmula",
  recurring: "Recurrente",
};

export const AutomationsView: React.FC = () => {
  const [selectedAuto, setSelectedAuto] = useState<AutomationDefinition | null>(null);
  const [filterBoard, setFilterBoard] = useState<string>("all");

  const sourceBoards = [...new Set(ALL_AUTOMATIONS.map((a) => a.sourceBoard))];

  const filtered =
    filterBoard === "all"
      ? ALL_AUTOMATIONS
      : ALL_AUTOMATIONS.filter((a) => a.sourceBoard === filterBoard);

  // Count cross-board automations
  const crossBoard = ALL_AUTOMATIONS.filter((a) => a.targetBoard).length;

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>
          Automatizaciones
        </h2>
        <p style={{ color: "var(--dp-gray)", fontSize: "13px" }}>
          {ALL_AUTOMATIONS.length} automatizaciones definidas |{" "}
          {crossBoard} cross-board |{" "}
          {ALL_AUTOMATIONS.length - crossBoard} internas
        </p>
      </div>

      {/* Filter */}
      <div className="nav-tabs">
        <button
          className={`nav-tab ${filterBoard === "all" ? "nav-tab--active" : ""}`}
          onClick={() => setFilterBoard("all")}
        >
          Todas ({ALL_AUTOMATIONS.length})
        </button>
        {sourceBoards.map((board) => (
          <button
            key={board}
            className={`nav-tab ${filterBoard === board ? "nav-tab--active" : ""}`}
            onClick={() => setFilterBoard(board)}
          >
            {BOARD_LABELS[board] || board}
          </button>
        ))}
      </div>

      {/* Automation List */}
      <div style={{ display: "flex", gap: "16px" }}>
        <div style={{ flex: 1 }}>
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>ID</th>
                <th>Nombre</th>
                <th>Trigger</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((auto) => (
                <tr
                  key={auto.id}
                  onClick={() => setSelectedAuto(auto)}
                  style={{
                    cursor: "pointer",
                    background:
                      selectedAuto?.id === auto.id ? "#f0f3ff" : undefined,
                  }}
                >
                  <td>
                    <code style={{ fontWeight: 700, color: "var(--dp-primary)" }}>
                      {auto.id}
                    </code>
                  </td>
                  <td style={{ fontWeight: 500, fontSize: "13px" }}>{auto.name}</td>
                  <td>
                    <span className="badge badge--gray" style={{ fontSize: "10px" }}>
                      {TRIGGER_TYPE_LABELS[auto.trigger.type] || auto.trigger.type}
                    </span>
                  </td>
                  <td style={{ fontSize: "12px" }}>
                    {BOARD_LABELS[auto.sourceBoard] || auto.sourceBoard}
                  </td>
                  <td style={{ fontSize: "12px" }}>
                    {auto.targetBoard ? (
                      <span style={{ color: "var(--dp-primary)" }}>
                        {BOARD_LABELS[auto.targetBoard] || auto.targetBoard}
                      </span>
                    ) : (
                      <span style={{ color: "var(--dp-light-gray)" }}>Interno</span>
                    )}
                  </td>
                  <td>
                    <span className="badge badge--blue" style={{ fontSize: "10px" }}>
                      {auto.actions.length}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selectedAuto && (
          <div style={{ width: "350px", flexShrink: 0 }}>
            <div className="card">
              <div className="card-header">
                <h2 style={{ fontSize: "14px" }}>
                  {selectedAuto.id}: {selectedAuto.name}
                </h2>
              </div>

              <p style={{ fontSize: "13px", color: "var(--dp-gray)", marginBottom: "16px" }}>
                {selectedAuto.description}
              </p>

              <div style={{ marginBottom: "12px" }}>
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "var(--dp-gray)", marginBottom: "4px" }}>
                  Trigger
                </div>
                <div style={{ fontSize: "13px" }}>
                  <strong>Tipo:</strong> {TRIGGER_TYPE_LABELS[selectedAuto.trigger.type]}
                  {selectedAuto.trigger.column && (
                    <div><strong>Columna:</strong> {selectedAuto.trigger.column}</div>
                  )}
                  {selectedAuto.trigger.value && (
                    <div><strong>Valor:</strong> {selectedAuto.trigger.value}</div>
                  )}
                  {selectedAuto.trigger.schedule && (
                    <div><strong>Programación:</strong> {selectedAuto.trigger.schedule}</div>
                  )}
                </div>
              </div>

              <div>
                <div style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: "var(--dp-gray)", marginBottom: "4px" }}>
                  Acciones ({selectedAuto.actions.length})
                </div>
                {selectedAuto.actions.map((action, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "8px 12px",
                      background: "var(--dp-bg)",
                      borderRadius: "4px",
                      marginBottom: "4px",
                      fontSize: "12px",
                    }}
                  >
                    <strong>{action.type}</strong>
                    <pre style={{ fontSize: "11px", color: "var(--dp-gray)", margin: "4px 0 0", whiteSpace: "pre-wrap" }}>
                      {JSON.stringify(action.params, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
