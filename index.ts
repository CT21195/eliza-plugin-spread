/**
 * eliza-plugin-spread — ElizaOS plugin routing agent tool calls into the
 * Spread Paywall API (78 pay-per-call x402 endpoints, settled in USDC on Base).
 *
 * Each action extracts its query params from the agent's message text and pays
 * per call via x402 v2 (EIP-3009 TransferWithAuthorization signed by the key in
 * SPREAD_API_EVM_KEY). No gas needed — the facilitator settles on-chain.
 */
import type { Plugin } from "@elizaos/core";
import { spreadAction } from "./spread.js";
import { baseSpreadAction } from "./base-spread.js";
import { chainBalanceAction } from "./chain-balance.js";
import { chainErc20BalanceAction } from "./chain-erc20-balance.js";
import { chainBlockNumberAction } from "./chain-block-number.js";
import { chainSolBalanceAction } from "./chain-sol-balance.js";
import { chainSplBalanceAction } from "./chain-spl-balance.js";
import { chainSlotAction } from "./chain-slot.js";
import { whaleWatchAction } from "./whale-watch.js";
import { solanaAuditAction } from "./solana-audit.js";
import { walletPortfolioAction } from "./wallet-portfolio.js";
import { pumpTrendingAction } from "./pump-trending.js";
import { pumpMigratingAction } from "./pump-migrating.js";
import { stocksPriceAction } from "./stocks-price.js";
import { scrapeAction } from "./scrape.js";
import { verifyNpiAction } from "./verify-npi.js";
import { verifyDeaAction } from "./verify-dea.js";

export const spreadPlugin: Plugin = {
  name: "spread",
  description:
    "Pay-per-call data endpoints (SOL spreads, Base DEX spreads, chain balances and block height, whale watching, token audits, pump.fun, tokenized stocks, scraping, NPI/DEA verification) paid in USDC on Base via x402.",
  actions: [
    spreadAction,
    baseSpreadAction,
    chainBalanceAction,
    chainErc20BalanceAction,
    chainBlockNumberAction,
    chainSolBalanceAction,
    chainSplBalanceAction,
    chainSlotAction,
    whaleWatchAction,
    solanaAuditAction,
    walletPortfolioAction,
    pumpTrendingAction,
    pumpMigratingAction,
    stocksPriceAction,
    scrapeAction,
    verifyNpiAction,
    verifyDeaAction,
  ],
  init: async () => {
    if (!process.env.SPREAD_API_EVM_KEY) {
      console.warn(
        "[eliza-plugin-spread] SPREAD_API_EVM_KEY is not set — actions will fail until it is configured."
      );
    }
  },
};

export default spreadPlugin;
