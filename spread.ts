import { extractAfter } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const spreadAction = makePaidAction({
  name: "SPREAD_CHECK",
  similes: ["CHECK_SPREAD", "SOL_SPREAD", "GET_SPREAD", "SPREAD_DATA", "CEX_DEX_SPREAD"],
  description:
    "Get live SOL prices from top centralized exchanges and Solana DEXs plus the widest bid-ask spread detected. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const notional = extractAfter(text, "notional");
    return `/spread${notional ? `?notional=${encodeURIComponent(notional)}` : ""}`;
  },
  missingHint: "SPREAD_CHECK never requires parameters; something else went wrong.",
  examples: [
    [
      { name: "{{user}}", content: { text: "What's the SOL spread right now?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check the live SOL CEX/DEX spread.", actions: ["SPREAD_CHECK"] },
      },
    ],
  ],
});
