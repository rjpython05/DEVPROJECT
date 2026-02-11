import React from "react";
import { ALL_BOARDS, BOARDS_BY_LEVEL } from "../../shared/schemas/all-boards.js";
import { BOARD_CONNECTIONS } from "../../shared/schemas/connections.js";
import { BoardCard } from "../components/BoardCard.js";

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
  componente: "Componente [N]",
  contratos: "Contratos",
  issues_cambios: "Issues y Cambios",
  lecciones_aprendidas: "Lecciones Aprendidas",
};

export const BoardArchitectureView: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>
          Arquitectura de Boards
        </h2>
        <p style={{ color: "var(--dp-gray)", fontSize: "13px" }}>
          {ALL_BOARDS.length} boards en 3 niveles |{" "}
          {BOARD_CONNECTIONS.length} conexiones cross-board |{" "}
          8 dominios PMI cubiertos
        </p>
      </div>

      {/* Level: Estratégico */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Nivel Estratégico</h3>
          <span className="badge badge--purple">
            {BOARDS_BY_LEVEL.estrategico.length} boards
          </span>
          <span style={{ fontSize: "12px", color: "var(--dp-gray)" }}>
            Vista ejecutiva y punto de entrada
          </span>
        </div>
        <div className="grid grid--2">
          {BOARDS_BY_LEVEL.estrategico.map((board) => (
            <BoardCard key={board.key} board={board} />
          ))}
        </div>
      </div>

      {/* Level: Táctico */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Nivel Táctico</h3>
          <span className="badge badge--blue">
            {BOARDS_BY_LEVEL.tactico.length} boards
          </span>
          <span style={{ fontSize: "12px", color: "var(--dp-gray)" }}>
            Planificación, gestión y control
          </span>
        </div>
        <div className="grid grid--3">
          {BOARDS_BY_LEVEL.tactico.map((board) => (
            <BoardCard key={board.key} board={board} />
          ))}
        </div>
      </div>

      {/* Level: Operativo */}
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600 }}>Nivel Operativo</h3>
          <span className="badge badge--green">
            {BOARDS_BY_LEVEL.operativo.length} boards
          </span>
          <span style={{ fontSize: "12px", color: "var(--dp-gray)" }}>
            Ejecución diaria y registro
          </span>
        </div>
        <div className="grid grid--3">
          {BOARDS_BY_LEVEL.operativo.map((board) => (
            <BoardCard key={board.key} board={board} />
          ))}
        </div>
      </div>

      {/* Cross-board connections */}
      <div className="card">
        <div className="card-header">
          <h2>Mapa de Conexiones Cross-Board</h2>
          <span className="badge badge--blue">{BOARD_CONNECTIONS.length} conexiones</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Board Origen</th>
              <th>Columna</th>
              <th style={{ width: "40px", textAlign: "center" }}>&rarr;</th>
              <th>Board Destino</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {BOARD_CONNECTIONS.map((conn, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>
                  {BOARD_LABELS[conn.sourceBoard] || conn.sourceBoard}
                </td>
                <td>
                  <code style={{ fontSize: "11px" }}>{conn.sourceColumn}</code>
                </td>
                <td style={{ textAlign: "center", color: "var(--dp-primary)" }}>&rarr;</td>
                <td style={{ fontWeight: 500 }}>
                  {BOARD_LABELS[conn.targetBoard] || conn.targetBoard}
                </td>
                <td style={{ fontSize: "12px", color: "var(--dp-gray)" }}>
                  {conn.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
