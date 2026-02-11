import { Router } from "express";
import { ProvisioningService } from "../services/provisioning.js";

const router = Router();

/**
 * POST /api/provision
 * Provision a complete DevProject workspace with all boards, columns, groups, and connections.
 *
 * Body:
 * - projectName: string (required)
 * - numComponents: number (default: 3)
 * - apiToken: string (required if not using env)
 */
router.post("/", async (req, res) => {
  try {
    const { projectName, numComponents = 3, apiToken } = req.body;

    if (!projectName) {
      res.status(400).json({ error: "projectName is required" });
      return;
    }

    const token = apiToken || process.env.MONDAY_API_TOKEN;
    if (!token) {
      res.status(400).json({ error: "API token is required (body.apiToken or MONDAY_API_TOKEN env)" });
      return;
    }

    const service = new ProvisioningService(token);
    const result = await service.provisionWorkspace(projectName, numComponents);

    res.json({
      success: result.errors.length === 0,
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: (err as Error).message,
    });
  }
});

/**
 * GET /api/provision/schema
 * Returns the full board schema definitions for reference.
 */
router.get("/schema", (_req, res) => {
  // Dynamic import to avoid circular deps
  import("../../shared/schemas/all-boards.js").then(({ ALL_BOARDS, BOARDS_BY_LEVEL }) => {
    import("../../shared/schemas/automations.js").then(({ ALL_AUTOMATIONS }) => {
      import("../../shared/schemas/connections.js").then(({ BOARD_CONNECTIONS }) => {
        res.json({
          boards: {
            total: ALL_BOARDS.length,
            byLevel: {
              estrategico: BOARDS_BY_LEVEL.estrategico.map((b) => ({ key: b.key, name: b.name })),
              tactico: BOARDS_BY_LEVEL.tactico.map((b) => ({ key: b.key, name: b.name })),
              operativo: BOARDS_BY_LEVEL.operativo.map((b) => ({ key: b.key, name: b.name })),
            },
            definitions: ALL_BOARDS,
          },
          automations: {
            total: ALL_AUTOMATIONS.length,
            definitions: ALL_AUTOMATIONS,
          },
          connections: {
            total: BOARD_CONNECTIONS.length,
            definitions: BOARD_CONNECTIONS,
          },
        });
      });
    });
  });
});

export default router;
