import { extractAfter, extractBaseAddress } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const baseSpreadAction = makePaidAction({
  name: "BASE_SPREAD_CHECK",
  similes: ["CHECK_BASE_SPREAD", "BASE_SPREAD", "GET_BASE_SPREAD", "BASE_DEX_SPREAD", "BASE_ARBITRAGE"],
  description:
    "Get live cross-DEX spreads on Base for a token (default WETH): prices from the top 5 Base DEXs (Uniswap, Aerodrome, PancakeSwap, …) plus the widest spread detected. Provide a Base token contract address, or omit it for WETH. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const token = extractBaseAddress(text);
    const notional = extractAfter(text, "notional");
    const params = new URLSearchParams();
    if (token) params.set("token", token);
    if (notional) params.set("notional", notional);
    const qs = params.toString();
    return `/spread/base${qs ? `?${qs}` : ""}`;
  },
  missingHint: "BASE_SPREAD_CHECK never requires parameters (defaults to WETH on Base); something else went wrong.",
  examples: [
    [
      { name: "{{user}}", content: { text: "What's the WETH spread across Base DEXs right now?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check the live Base DEX spread for WETH.", actions: ["BASE_SPREAD_CHECK"] },
      },
    ],
    [
      { name: "{{user}}", content: { text: "Check the Base spread for token 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check the live Base DEX spread for that token.", actions: ["BASE_SPREAD_CHECK"] },
      },
    ],
  ],
});
