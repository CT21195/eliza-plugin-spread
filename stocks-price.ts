import { extractAfter, extractSymbol } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const stocksPriceAction = makePaidAction({
  name: "STOCKS_PRICE",
  similes: ["STOCK_PRICE", "TOKENIZED_STOCK", "GET_STOCK_PRICE", "STOCK_QUOTE", "XSTOCK_PRICE"],
  description:
    "Live price quote for a tokenized stock symbol. Provide the stock symbol (e.g. TSLA). Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const symbol = extractAfter(text, "symbol") ?? extractSymbol(text);
    return symbol ? `/stocks/price?symbol=${encodeURIComponent(symbol)}` : null;
  },
  missingHint: "STOCKS_PRICE needs a stock symbol, e.g. TSLA.",
  examples: [
    [
      { name: "{{user}}", content: { text: "What's the tokenized price of NVDA?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll get the tokenized NVDA quote.", actions: ["STOCKS_PRICE"] },
      },
    ],
  ],
});
