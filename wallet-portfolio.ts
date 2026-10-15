import { extractSolanaAddress } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const walletPortfolioAction = makePaidAction({
  name: "WALLET_PORTFOLIO",
  similes: ["PORTFOLIO", "WALLET_BALANCE", "CHECK_PORTFOLIO", "WALLET_HOLDINGS", "GET_HOLDINGS"],
  description:
    "Full token portfolio and balances for a Solana wallet via Helius. Provide a Solana wallet address. Costs $0.05 USDC per call (x402, Base).",
  buildPath: (text) => {
    const wallet = extractSolanaAddress(text);
    return wallet ? `/wallet/portfolio?wallet=${encodeURIComponent(wallet)}` : null;
  },
  missingHint: "WALLET_PORTFOLIO needs a Solana wallet address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Show me the holdings of 9xQeWvG816bUx9EPjWMnCretL5qRSJ8Xv5x5x5x5x5x5x5" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll fetch that wallet's portfolio.", actions: ["WALLET_PORTFOLIO"] },
      },
    ],
  ],
});
