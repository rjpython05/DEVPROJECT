/**
 * CLI script to provision a DevProject workspace in Monday.com.
 *
 * Usage:
 *   npx tsx src/server/scripts/provision.ts --name "Mi Proyecto" --components 3
 *
 * Requires MONDAY_API_TOKEN environment variable.
 */
import dotenv from "dotenv";
import { ProvisioningService } from "../services/provisioning.js";

dotenv.config();

async function main() {
  const args = process.argv.slice(2);
  const nameIdx = args.indexOf("--name");
  const compIdx = args.indexOf("--components");

  const projectName = nameIdx >= 0 ? args[nameIdx + 1] : undefined;
  const numComponents = compIdx >= 0 ? parseInt(args[compIdx + 1], 10) : 3;

  if (!projectName) {
    console.error("Usage: npx tsx src/server/scripts/provision.ts --name \"Project Name\" [--components N]");
    process.exit(1);
  }

  const apiToken = process.env.MONDAY_API_TOKEN;
  if (!apiToken) {
    console.error("Error: MONDAY_API_TOKEN environment variable is required");
    process.exit(1);
  }

  console.log("=".repeat(60));
  console.log("DevProject - Provisioning Workspace");
  console.log("=".repeat(60));
  console.log(`Project: ${projectName}`);
  console.log(`Components: ${numComponents}`);
  console.log("");

  const service = new ProvisioningService(apiToken);

  const result = await service.provisionWorkspace(
    projectName,
    numComponents,
    (progress) => {
      const pct = Math.round((progress.current / progress.total) * 100);
      console.log(`[${pct}%] ${progress.step}`);
    }
  );

  console.log("");
  console.log("=".repeat(60));
  console.log("Provisioning Complete");
  console.log("=".repeat(60));
  console.log(`Workspace: ${result.workspaceName} (ID: ${result.workspaceId})`);
  console.log(`Boards created: ${result.boards.length}`);
  console.log(`Connections created: ${result.connectionsCreated}`);

  if (result.errors.length > 0) {
    console.log("");
    console.log(`Warnings (${result.errors.length}):`);
    result.errors.forEach((err) => console.log(`  - ${err}`));
  }

  console.log("");
  console.log("Board Summary:");
  console.log("-".repeat(60));
  for (const board of result.boards) {
    console.log(`  ${board.name.padEnd(35)} ID: ${board.boardId}  (${board.columnsCreated} cols, ${board.groupsCreated} groups)`);
  }

  console.log("");
  console.log("Done. Open Monday.com to see your new workspace.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
