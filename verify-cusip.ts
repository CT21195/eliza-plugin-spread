import { extractCusip } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyCusipAction = makePaidAction({
  name: "VERIFY_CUSIP",
  similes: ["CUSIP_LOOKUP", "CHECK_CUSIP", "CUSIP_VERIFY"],
  description:
    "Validate a CUSIP securities identifier checksum. Provide the cusip. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractCusip(text);
    return v ? `/verify/cusip?cusip=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_CUSIP needs a CUSIP (e.g. 037833100) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate CUSIP 037833100" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_CUSIP"] },
      },
    ],
  ],
});
