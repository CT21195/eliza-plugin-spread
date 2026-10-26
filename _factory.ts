/**
 * Factory for Spread Paywall API actions. Each action is a thin wrapper that
 * extracts query params from the agent's message text, calls the paid endpoint
 * via x402, and returns the JSON result as text.
 */
import {
  type Action,
  type ActionResult,
  type HandlerCallback,
  type IAgentRuntime,
  type Memory,
  type State,
} from "@elizaos/core";
import { paidFetch } from "./x402.js";

export interface PaidActionConfig {
  name: string;
  similes: string[];
  description: string;
  /** Build the API path (including query string) from message text, or null if required params are missing. */
  buildPath: (text: string) => string | null;
  /** Human-readable hint shown when required params are missing. */
  missingHint: string;
  examples: Action["examples"];
}

export function makePaidAction(cfg: PaidActionConfig): Action {
  return {
    name: cfg.name,
    similes: cfg.similes,
    description: cfg.description,
    validate: async (_runtime: IAgentRuntime) => {
      // Only requires the funding key; the endpoint itself is always available.
      return Boolean(process.env.SPREAD_API_EVM_KEY);
    },
    handler: async (
      _runtime: IAgentRuntime,
      message: Memory,
      _state?: State,
      _options?: Record<string, unknown>,
      callback?: HandlerCallback
    ): Promise<ActionResult> => {
      const text = message.content?.text ?? "";
      const path = cfg.buildPath(text);
      if (!path) {
        const reply = cfg.missingHint;
        await callback?.({ text: reply, source: message.content?.source });
        return { success: false, text: reply, data: { actionName: cfg.name } };
      }
      try {
        const data = await paidFetch(path);
        const reply = JSON.stringify(data).slice(0, 4000);
        await callback?.({ text: reply, source: message.content?.source });
        return { success: true, text: reply, data: { actionName: cfg.name } };
      } catch (err) {
        const reply = `Spread API call failed: ${err instanceof Error ? err.message : String(err)}`;
        await callback?.({ text: reply, source: message.content?.source });
        return {
          success: false,
          text: reply,
          values: { error: "API_CALL_FAILED" },
          data: { actionName: cfg.name },
        };
      }
    },
    examples: cfg.examples,
  };
}
