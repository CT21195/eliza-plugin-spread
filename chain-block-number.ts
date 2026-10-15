import { makePaidAction } from "./_factory.js";

export const chainBlockNumberAction = makePaidAction({
  name: "CHAIN_BLOCK_NUMBER_CHECK",
  similes: ["BLOCK_NUMBER", "BASE_BLOCK", "GET_BLOCK_NUMBER", "LATEST_BLOCK"],
  description:
    "Get the current Base block number. Costs $0.001 USDC per call (x402, Base).",
  buildPath: () => "/chain/block-number",
  missingHint: "CHAIN_BLOCK_NUMBER_CHECK never requires parameters; something else went wrong.",
  examples: [
    [
      { name: "{{user}}", content: { text: "What's the latest Base block number?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll fetch the current Base block number.", actions: ["CHAIN_BLOCK_NUMBER_CHECK"] },
      },
    ],
  ],
});
