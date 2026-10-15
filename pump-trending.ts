import { extractAfter } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const pumpTrendingAction = makePaidAction({
  name: "PUMP_TRENDING",
  similes: ["TRENDING_TOKENS", "PUMP_TOKENS", "HOT_PUMP", "PUMPFUN_TRENDING", "TRENDING_PUMP"],
  description:
    "Trending pump.fun tokens right now via GeckoTerminal. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const limit = extractAfter(text, "limit");
    return `/pump/trending${limit ? `?limit=${encodeURIComponent(limit)}` : ""}`;
  },
  missingHint: "PUMP_TRENDING never requires parameters; something else went wrong.",
  examples: [
    [
      { name: "{{user}}", content: { text: "What pump.fun tokens are trending?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check what's trending on pump.fun.", actions: ["PUMP_TRENDING"] },
      },
    ],
  ],
});
