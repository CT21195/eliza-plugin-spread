import { extractEan } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyEanAction = makePaidAction({
  name: "VERIFY_EAN",
  similes: ["EAN_LOOKUP", "CHECK_EAN", "EAN_VERIFY"],
  description:
    "Validate EAN-13/EAN-8 barcode checksums. Provide the ean barcode. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractEan(text);
    return v ? `/verify/ean?ean=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_EAN needs a 13-digit EAN-13 or 8-digit EAN-8 in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate EAN 4006381333931" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_EAN"] },
      },
    ],
  ],
});
