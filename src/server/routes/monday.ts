import { Router } from "express";
import { AutomationHandler } from "../services/automation-handler.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

/**
 * POST /api/monday/execute_action
 * Called by Monday.com when an integration action is triggered.
 * Requires JWT authentication via MONDAY_SIGNING_SECRET.
 */
router.post("/execute_action", authMiddleware, async (req, res) => {
  try {
    const { payload } = req.body;
    const { inputFields } = payload;

    const apiToken = req.headers["x-monday-api-token"] as string || process.env.MONDAY_API_TOKEN;
    if (!apiToken) {
      res.status(400).json({ error: "API token not available" });
      return;
    }

    const handler = new AutomationHandler(apiToken);

    const results = await handler.handleTrigger(
      inputFields.triggerType || "status_change",
      {
        boardId: String(inputFields.boardId),
        itemId: String(inputFields.itemId),
        itemName: inputFields.itemName || "",
        columnId: inputFields.columnId,
        columnValue: inputFields.columnValue,
        previousValue: inputFields.previousValue,
        userId: String(req.session?.userId || ""),
        accountId: String(req.session?.accountId || ""),
      }
    );

    res.json({ success: true, results });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
});

/**
 * POST /api/monday/subscribe
 * Called when an integration recipe is installed (subscribe to trigger).
 */
router.post("/subscribe", authMiddleware, async (req, res) => {
  try {
    const { payload } = req.body;
    const { webhookUrl, subscriptionId, inputFields } = payload;

    // Store subscription for webhook delivery
    console.log(`[DevProject] Subscription created: ${subscriptionId}`, {
      webhookUrl,
      inputFields,
    });

    res.json({ webhookId: subscriptionId });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/**
 * POST /api/monday/unsubscribe
 * Called when an integration recipe is removed.
 */
router.post("/unsubscribe", authMiddleware, async (req, res) => {
  try {
    const { payload } = req.body;
    const { webhookId } = payload;

    console.log(`[DevProject] Subscription removed: ${webhookId}`);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/**
 * POST /api/monday/get_remote_list_options
 * Returns dynamic options for integration recipe fields.
 */
router.post("/get_remote_list_options", authMiddleware, async (req, res) => {
  try {
    const { payload } = req.body;
    const { inputFields } = payload;

    // Return board options based on the field requested
    if (inputFields?.fieldId === "targetBoard") {
      const { ALL_BOARDS } = await import("../../shared/schemas/all-boards.js");
      const options = ALL_BOARDS.map((b) => ({
        title: b.name,
        value: b.key,
      }));
      res.json(options);
      return;
    }

    res.json([]);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
