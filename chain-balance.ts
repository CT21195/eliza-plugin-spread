import { extractBaseAddress } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const chainBalanceAction = makePaidAction({
  name: "CHAIN_BALANCE_CHECK",
  similes: ["CHECK_CHAIN_BALANCE", "BASE_BALANCE", "ETH_BALANCE", "GET_ETH_BALANCE"],
  description:
    "Get the native ETH balance of a Base address. Provide a 0x address. Costs $0.003 USDC per call (x402, Base).",
  buildPath: (text) => {
    const address = extractBaseAddress(text);
    return address ? `/chain/balance?address=${encodeURIComponent(address)}` : null;
  },
  missingHint: "CHAIN_BALANCE_CHECK needs a 0x Base address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "What's the ETH balance of 0xD7CDd563e8F6A249B076A702b7e2C233CCF3481d on Base?" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check that Base address's ETH balance.", actions: ["CHAIN_BALANCE_CHECK"] },
      },
    ],
  ],
});
