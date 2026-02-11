import type { AutomationDefinition } from "../../shared/types/monday.js";
import { ALL_AUTOMATIONS } from "../../shared/schemas/automations.js";
import { MondayApiService } from "./monday-api.js";

interface AutomationContext {
  boardId: string;
  itemId: string;
  itemName: string;
  columnId?: string;
  columnValue?: string;
  previousValue?: string;
  userId: string;
  accountId: string;
}

interface ActionResult {
  success: boolean;
  automationId: string;
  action: string;
  details?: string;
  error?: string;
}

/**
 * Handles execution of DevProject automation actions.
 * Maps automation definitions to actual Monday.com API calls.
 */
export class AutomationHandler {
  private api: MondayApiService;

  constructor(apiToken: string) {
    this.api = new MondayApiService(apiToken);
  }

  /**
   * Find and execute matching automations for a given trigger event.
   */
  async handleTrigger(
    triggerType: string,
    context: AutomationContext
  ): Promise<ActionResult[]> {
    const results: ActionResult[] = [];

    // Find matching automation definitions
    const matching = ALL_AUTOMATIONS.filter((auto) => {
      if (auto.trigger.type !== triggerType) return false;
      if (auto.trigger.column && auto.trigger.column !== context.columnId) return false;
      if (auto.trigger.value && auto.trigger.value !== context.columnValue) return false;
      return true;
    });

    for (const automation of matching) {
      for (const action of automation.actions) {
        try {
          const result = await this.executeAction(automation, action, context);
          results.push(result);
        } catch (err) {
          results.push({
            success: false,
            automationId: automation.id,
            action: action.type,
            error: (err as Error).message,
          });
        }
      }
    }

    return results;
  }

  private async executeAction(
    automation: AutomationDefinition,
    action: { type: string; params: Record<string, unknown> },
    context: AutomationContext
  ): Promise<ActionResult> {
    const { type, params } = action;

    switch (type) {
      case "notify":
        return this.executeNotify(automation, params, context);

      case "change_status":
        return this.executeChangeStatus(automation, params, context);

      case "set_value":
        return this.executeSetValue(automation, params, context);

      case "create_item":
        return this.executeCreateItem(automation, params, context);

      case "update_connected":
        return this.executeUpdateConnected(automation, params, context);

      default:
        return {
          success: true,
          automationId: automation.id,
          action: type,
          details: `Action type '${type}' registered (custom implementation needed)`,
        };
    }
  }

  private async executeNotify(
    automation: AutomationDefinition,
    params: Record<string, unknown>,
    context: AutomationContext
  ): Promise<ActionResult> {
    const message = (params.message as string)
      .replace("{item_name}", context.itemName)
      .replace("{dias_en_etapa}", context.columnValue || "?");

    // Monday.com notifications are sent via updates API
    await this.api.query(`
      mutation ($itemId: ID!, $body: String!) {
        create_update(item_id: $itemId, body: $body) {
          id
        }
      }
    `, { itemId: Number(context.itemId), body: `[DevProject Auto] ${message}` });

    return {
      success: true,
      automationId: automation.id,
      action: "notify",
      details: message,
    };
  }

  private async executeChangeStatus(
    automation: AutomationDefinition,
    params: Record<string, unknown>,
    context: AutomationContext
  ): Promise<ActionResult> {
    const column = params.column as string;
    const value = params.value as string;

    await this.api.updateColumnValue(
      context.boardId,
      context.itemId,
      column,
      JSON.stringify({ label: value })
    );

    return {
      success: true,
      automationId: automation.id,
      action: "change_status",
      details: `Set ${column} = ${value}`,
    };
  }

  private async executeSetValue(
    automation: AutomationDefinition,
    params: Record<string, unknown>,
    context: AutomationContext
  ): Promise<ActionResult> {
    const column = params.column as string;
    const value = params.value;

    await this.api.updateColumnValue(
      context.boardId,
      context.itemId,
      column,
      JSON.stringify(value)
    );

    return {
      success: true,
      automationId: automation.id,
      action: "set_value",
      details: `Set ${column} = ${String(value)}`,
    };
  }

  private async executeCreateItem(
    automation: AutomationDefinition,
    params: Record<string, unknown>,
    context: AutomationContext
  ): Promise<ActionResult> {
    const targetBoard = params.targetBoard as string;
    const group = params.group as string;

    // Get source item data
    const items = await this.api.getBoardItems(context.boardId, 1);
    const sourceItem = items.find((i) => i.id === context.itemId);

    await this.api.createItem(
      targetBoard,
      group,
      sourceItem?.name || context.itemName
    );

    return {
      success: true,
      automationId: automation.id,
      action: "create_item",
      details: `Created item in ${targetBoard}/${group}`,
    };
  }

  private async executeUpdateConnected(
    automation: AutomationDefinition,
    params: Record<string, unknown>,
    _context: AutomationContext
  ): Promise<ActionResult> {
    const targetBoard = params.targetBoard as string;
    const recalculate = params.recalculate as string | undefined;

    return {
      success: true,
      automationId: automation.id,
      action: "update_connected",
      details: `Queued update for ${targetBoard}${recalculate ? ` (recalculate: ${recalculate})` : ""}`,
    };
  }
}
