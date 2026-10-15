import { extractBtcAddress } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyBtcAddressAction = makePaidAction({
  name: "VERIFY_BTC_ADDRESS",
  similes: ["BTC_ADDRESS_LOOKUP", "CHECK_BTC_ADDRESS", "BITCOIN_ADDRESS_VERIFY"],
  description:
    "Validate a Bitcoin address (P2PKH/P2SH/bech32). Provide the bitcoin address. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractBtcAddress(text);
    return v ? `/verify/address/btc?address=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_BTC_ADDRESS needs a Bitcoin address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate BTC address 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_BTC_ADDRESS"] },
      },
    ],
  ],
});
