import { extractSolanaAddress } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const chainSolBalanceAction = makePaidAction({
  name: "CHAIN_SOL_BALANCE_CHECK",
  similes: ["SOL_BALANCE", "CHECK_SOL_BALANCE", "GET_SOL_BALANCE", "WALLET_SOL_BALANCE"],
  description:
    "Get the native SOL balance of a Solana wallet. Provide a Solana wallet address. Costs $0.003 USDC per call (x402, Base).",
  buildPath: (text) => {
    const wallet = extractSolanaAddress(text);
    return wallet ? `/chain/sol-balance?wallet=${encodeURIComponent(wallet)}` : null;
  },
  missingHint: "CHAIN_SOL_BALANCE_CHECK needs a Solana wallet address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "How much SOL is in E21AWkUtLz4BP7AaT82CF7v86Kmv4YzN4NAR1FQnEmqy?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check that wallet's SOL balance.", actions: ["CHAIN_SOL_BALANCE_CHECK"] },
      },
    ],
  ],
});
