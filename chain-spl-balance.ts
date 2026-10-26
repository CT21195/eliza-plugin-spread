import { extractSolanaAddresses } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const chainSplBalanceAction = makePaidAction({
  name: "CHAIN_SPL_BALANCE_CHECK",
  similes: ["SPL_BALANCE", "CHECK_SPL_BALANCE", "TOKEN_ACCOUNT_BALANCE", "SOLANA_TOKEN_BALANCE"],
  description:
    "Get SPL token balances for a Solana wallet and token mint. Provide the wallet address and the mint address (e.g. \"mint EPjF...\"). Costs $0.003 USDC per call (x402, Base).",
  buildPath: (text) => {
    const all = extractSolanaAddresses(text);
    const mintAfterKeyword = text.match(/mint\s+([1-9A-HJ-NP-Za-km-z]{32,44})/i)?.[1] ?? null;
    let wallet: string | null = null;
    let mint: string | null = null;
    if (mintAfterKeyword) {
      mint = mintAfterKeyword;
      wallet = all.find(a => a !== mintAfterKeyword) ?? null;
    } else if (all.length >= 2) {
      wallet = all[0];
      mint = all[1];
    }
    if (!wallet || !mint) return null;
    return `/chain/spl-balance?wallet=${encodeURIComponent(wallet)}&mint=${encodeURIComponent(mint)}`;
  },
  missingHint: "CHAIN_SPL_BALANCE_CHECK needs a wallet address and a token mint address, e.g. \"mint EPjF...\".",
  examples: [
    [
      { name: "{{user}}", content: { text: "How much USDC does E21AWkUtLz4BP7AaT82CF7v86Kmv4YzN4NAR1FQnEmqy hold? Mint EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check that wallet's USDC balance.", actions: ["CHAIN_SPL_BALANCE_CHECK"] },
      },
    ],
  ],
});
