import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import provisioningRoutes from "./routes/provisioning.js";
import mondayRoutes from "./routes/monday.js";
import oauthRoutes from "./routes/oauth.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/provision", provisioningRoutes);
app.use("/api/monday", mondayRoutes);
app.use("/oauth", oauthRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "DevProject Monday.com App",
    version: "1.0.0",
    framework: "PMBOK 7th Edition",
    timestamp: new Date().toISOString(),
  });
});

// Serve client in production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.join(__dirname, "../client");
  app.use(express.static(clientPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`[DevProject] Server running on port ${PORT}`);
  console.log(`[DevProject] Health check: http://localhost:${PORT}/api/health`);
  console.log(`[DevProject] Schema API: http://localhost:${PORT}/api/provision/schema`);
});

export default app;
