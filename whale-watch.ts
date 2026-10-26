import { extractSolanaAddress } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const whaleWatchAction = makePaidAction({
  name: "WHALE_WATCH",
  similes: ["WATCH_WHALE", "WHALE_TRACK", "TRACK_WALLET", "WHALE_ACTIVITY", "WALLET_SWAPS"],
  description:
    "Track recent token swap transactions for a Solana whale wallet via Helius. Provide a Solana wallet address. Costs $0.05 USDC per call (x402, Base).",
  buildPath: (text) => {
    const wallet = extractSolanaAddress(text);
    return wallet ? `/whale-watch?wallet=${encodeURIComponent(wallet)}` : null;
  },
  missingHint: "WHALE_WATCH needs a Solana wallet address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "What has this whale been buying: 9xQeWvG816bUx9EPjWMnCretL5qRSJ8Xv5x5x5x5x5x5x5?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll pull that wallet's recent swaps.", actions: ["WHALE_WATCH"] },
      },
    ],
  ],
});
