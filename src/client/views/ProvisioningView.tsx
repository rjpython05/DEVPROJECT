import React, { useState } from "react";

interface ProvisioningResult {
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

export const ProvisioningView: React.FC = () => {
  const [projectName, setProjectName] = useState("");
  const [numComponents, setNumComponents] = useState(3);
  const [apiToken, setApiToken] = useState("");
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [result, setResult] = useState<ProvisioningResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProvision = async () => {
    if (!projectName.trim()) return;

    setIsProvisioning(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/provision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectName: projectName.trim(),
          numComponents,
          apiToken: apiToken.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Provisioning failed");
      }

      setResult(data.data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsProvisioning(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "4px" }}>
          Provisionar Workspace
        </h2>
        <p style={{ color: "var(--dp-gray)", fontSize: "13px" }}>
          Crea un workspace completo de DevProject en Monday.com con todos los boards,
          columnas, grupos y conexiones cross-board definidas en la arquitectura.
        </p>
      </div>

      <div className="grid grid--2">
        {/* Form */}
        <div className="card">
          <div className="card-header">
            <h2>Configuración del Proyecto</h2>
          </div>

          <div className="form-group">
            <label>Nombre del Proyecto *</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="Ej: Programa de Educación Rural - BID"
            />
          </div>

          <div className="form-group">
            <label>Cantidad de Componentes</label>
            <select
              value={numComponents}
              onChange={(e) => setNumComponents(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} componente{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>API Token de Monday.com *</label>
            <input
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Token desde monday.com > Developers"
            />
            <small style={{ color: "var(--dp-gray)", fontSize: "11px" }}>
              Se usa una sola vez para crear el workspace. No se almacena.
            </small>
          </div>

          <button
            className="btn btn--primary"
            onClick={handleProvision}
            disabled={isProvisioning || !projectName.trim()}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {isProvisioning ? "Provisionando..." : "Crear Workspace Completo"}
          </button>
        </div>

        {/* Preview / Result */}
        <div className="card">
          <div className="card-header">
            <h2>{result ? "Resultado" : "Se crearán"}</h2>
          </div>

          {!result && !error && (
            <div style={{ fontSize: "13px", lineHeight: "2" }}>
              <div><strong>13 boards</strong> organizados en 3 niveles:</div>
              <div style={{ paddingLeft: "16px" }}>
                <div><span className="badge badge--purple" style={{ fontSize: "10px" }}>Estratégico</span> Portafolio, Pipeline</div>
                <div><span className="badge badge--blue" style={{ fontSize: "10px" }}>Táctico</span> Panel General, Marco Lógico, POA, Adquisiciones, Finanzas, Riesgos, Stakeholders</div>
                <div><span className="badge badge--green" style={{ fontSize: "10px" }}>Operativo</span> {numComponents} Componente{numComponents > 1 ? "s" : ""}, Contratos, Issues, Lecciones</div>
              </div>
              <div style={{ marginTop: "8px" }}>
                <div><strong>15+ conexiones</strong> cross-board</div>
                <div><strong>17 automatizaciones</strong> definidas</div>
                <div><strong>100+ columnas</strong> tipadas</div>
              </div>
            </div>
          )}

          {error && (
            <div style={{ color: "var(--dp-danger)", fontSize: "13px" }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          {result && (
            <div style={{ fontSize: "13px" }}>
              <div style={{ marginBottom: "12px", color: "var(--dp-success)", fontWeight: 600 }}>
                Workspace creado exitosamente
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Workspace:</strong> {result.workspaceName} (ID: {result.workspaceId})
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Boards creados:</strong> {result.boards.length}
              </div>
              <div style={{ marginBottom: "8px" }}>
                <strong>Conexiones:</strong> {result.connectionsCreated}
              </div>

              {result.errors.length > 0 && (
                <div style={{ marginTop: "12px" }}>
                  <strong style={{ color: "var(--dp-warning)" }}>Advertencias ({result.errors.length}):</strong>
                  <ul style={{ paddingLeft: "16px", marginTop: "4px" }}>
                    {result.errors.map((err, i) => (
                      <li key={i} style={{ color: "var(--dp-gray)", fontSize: "12px" }}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <table className="table" style={{ marginTop: "12px" }}>
                <thead>
                  <tr>
                    <th>Board</th>
                    <th>Columnas</th>
                    <th>Grupos</th>
                  </tr>
                </thead>
                <tbody>
                  {result.boards.map((b) => (
                    <tr key={b.key}>
                      <td style={{ fontWeight: 500 }}>{b.name}</td>
                      <td>{b.columnsCreated}</td>
                      <td>{b.groupsCreated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
