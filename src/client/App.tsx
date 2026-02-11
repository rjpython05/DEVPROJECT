import React, { useState, useEffect } from "react";
import { Header } from "./components/Header.js";
import { Sidebar } from "./components/Sidebar.js";
import { DashboardView } from "./views/DashboardView.js";
import { ProvisioningView } from "./views/ProvisioningView.js";
import { SchemaExplorerView } from "./views/SchemaExplorerView.js";
import { AutomationsView } from "./views/AutomationsView.js";
import { BoardArchitectureView } from "./views/BoardArchitectureView.js";

export type ViewId =
  | "dashboard"
  | "provisioning"
  | "schema"
  | "automations"
  | "architecture";

// Check if running inside Monday.com iframe
function isMondayContext(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewId>("dashboard");
  const [mondayContext, setMondayContext] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    if (isMondayContext()) {
      import("monday-sdk-js").then(({ default: mondaySdk }) => {
        const monday = mondaySdk();
        monday.execute("valueCreatedForUser");
        monday.listen("context", (res: { data: Record<string, unknown> }) => {
          setMondayContext(res.data);
        });
      });
    }
  }, []);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView mondayContext={mondayContext} />;
      case "provisioning":
        return <ProvisioningView />;
      case "schema":
        return <SchemaExplorerView />;
      case "automations":
        return <AutomationsView />;
      case "architecture":
        return <BoardArchitectureView />;
      default:
        return <DashboardView mondayContext={mondayContext} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header mondayContext={mondayContext} />
        <main className="app-container">{renderView()}</main>
      </div>
    </div>
  );
};

export default App;
