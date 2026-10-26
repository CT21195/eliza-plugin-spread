import { extractAfter } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const pumpMigratingAction = makePaidAction({
  name: "PUMP_MIGRATING",
  similes: ["MIGRATING_TOKENS", "PUMP_MIGRATION", "GRADUATING_TOKENS", "PUMPFUN_MIGRATING", "ABOUT_TO_MIGRATE"],
  description:
    "pump.fun tokens about to migrate/graduate to Raydium, via DexScreener batching. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const limit = extractAfter(text, "limit");
    return `/pump/migrating${limit ? `?limit=${encodeURIComponent(limit)}` : ""}`;
  },
  missingHint: "PUMP_MIGRATING never requires parameters; something else went wrong.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Which pump.fun tokens are about to migrate?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check which tokens are near migration.", actions: ["PUMP_MIGRATING"] },
      },
    ],
  ],
});
