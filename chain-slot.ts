import { makePaidAction } from "./_factory.js";

export const chainSlotAction = makePaidAction({
  name: "CHAIN_SLOT_CHECK",
  similes: ["SOLANA_SLOT", "GET_SLOT", "CURRENT_SLOT", "SLOT_CHECK"],
  description:
    "Get the current Solana slot. Costs $0.001 USDC per call (x402, Base).",
  buildPath: () => "/chain/slot",
  missingHint: "CHAIN_SLOT_CHECK never requires parameters; something else went wrong.",
  examples: [
    [
      { name: "{{user}}", content: { text: "What's the current Solana slot?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll fetch the current Solana slot.", actions: ["CHAIN_SLOT_CHECK"] },
      },
    ],
  ],
});
