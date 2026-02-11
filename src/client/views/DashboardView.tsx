import React from "react";

interface DashboardViewProps {
  mondayContext: Record<string, unknown> | null;
}

const KPI_CARDS = [
  { label: "Avance Físico", value: "—", unit: "%", color: "var(--dp-success)" },
  { label: "Ejecución Financiera", value: "—", unit: "%", color: "var(--dp-primary)" },
  { label: "Riesgos Críticos", value: "—", unit: "", color: "var(--dp-danger)" },
  { label: "Procesos Activos", value: "—", unit: "", color: "var(--dp-warning)" },
];

const DOMAIN_STATUS = [
  { domain: "Stakeholders", status: "ok", description: "Registro completo, comunicaciones al día" },
  { domain: "Equipo", status: "ok", description: "UEP operativa con roles asignados" },
  { domain: "Ciclo de Vida", status: "ok", description: "Fase: Ejecución" },
  { domain: "Planificación", status: "warning", description: "POA requiere actualización trimestral" },
  { domain: "Trabajo", status: "ok", description: "Componentes en ejecución normal" },
  { domain: "Entrega", status: "ok", description: "Entregables vinculados a Marco Lógico" },
  { domain: "Medición", status: "warning", description: "Pendiente actualización indicadores" },
  { domain: "Incertidumbre", status: "alert", description: "2 riesgos críticos abiertos" },
];

const STATUS_COLORS: Record<string, string> = {
  ok: "var(--dp-success)",
  warning: "var(--dp-warning)",
  alert: "var(--dp-danger)",
};

export const DashboardView: React.FC<DashboardViewProps> = ({ mondayContext }) => {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>
          Dashboard Ejecutivo
        </h2>
        <p style={{ color: "var(--dp-gray)", fontSize: "13px" }}>
          Vista consolidada del proyecto &mdash; 8 Dominios de Rendimiento PMI
          {mondayContext && ` | Board: ${mondayContext.boardId || "N/A"}`}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid--4" style={{ marginBottom: "24px" }}>
        {KPI_CARDS.map((kpi) => (
          <div className="card" key={kpi.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "12px", color: "var(--dp-gray)", marginBottom: "8px" }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: "32px", fontWeight: 700, color: kpi.color }}>
              {kpi.value}
              <span style={{ fontSize: "16px", fontWeight: 400 }}>{kpi.unit}</span>
            </div>
            <div style={{ fontSize: "11px", color: "var(--dp-light-gray)", marginTop: "4px" }}>
              Conecte Monday.com para datos en vivo
            </div>
          </div>
        ))}
      </div>

      {/* 8 PMI Domains Status */}
      <div className="card">
        <div className="card-header">
          <h2>8 Dominios de Rendimiento</h2>
          <span className="badge badge--blue">PMBOK 7ma Edición</span>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th style={{ width: "40px" }}>#</th>
              <th>Dominio PMI</th>
              <th>Estado</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {DOMAIN_STATUS.map((d, i) => (
              <tr key={d.domain}>
                <td style={{ color: "var(--dp-light-gray)" }}>{i + 1}</td>
                <td style={{ fontWeight: 600 }}>{d.domain}</td>
                <td>
                  <span
                    className="semaforo"
                    style={{ background: STATUS_COLORS[d.status] }}
                  />
                </td>
                <td style={{ color: "var(--dp-gray)", fontSize: "13px" }}>
                  {d.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cross-board Flow Summary */}
      <div className="grid grid--2" style={{ marginTop: "16px" }}>
        <div className="card">
          <div className="card-header">
            <h2>Flujo de Valor</h2>
          </div>
          <div style={{ fontSize: "13px", color: "var(--dp-gray)", lineHeight: "2" }}>
            <div>Pipeline &rarr; Portafolio &rarr; Workspace</div>
            <div>Marco Lógico &harr; POA &harr; Plan Adquisiciones</div>
            <div>Plan Adquisiciones &rarr; Contratos &rarr; G. Financiera</div>
            <div>Contrato &rarr; Entregable &rarr; Pago &rarr; Indicador</div>
            <div>Riesgos &harr; Issues &rarr; Lecciones Aprendidas</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2>Automatizaciones Activas</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {[
              { id: "A4", label: "Fecha vencida -> Retrasada", board: "POA" },
              { id: "A8", label: "No Objeción -> Notificar", board: "Adquisiciones" },
              { id: "A12", label: "Riesgo Crítico -> Issue", board: "Riesgos" },
              { id: "A17", label: "Reporte mensual automático", board: "General" },
            ].map((auto) => (
              <div
                key={auto.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "13px",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "var(--dp-primary)",
                    fontFamily: "monospace",
                    width: "28px",
                  }}
                >
                  {auto.id}
                </span>
                <span style={{ flex: 1 }}>{auto.label}</span>
                <span className="badge badge--gray">{auto.board}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
