import { extractUpc } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyUpcAction = makePaidAction({
  name: "VERIFY_UPC",
  similes: ["UPC_LOOKUP", "CHECK_UPC", "UPC_VERIFY", "BARCODE_VERIFY"],
  description:
    "Validate UPC-A/UPC-E barcode checksums. Provide the upc barcode. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractUpc(text);
    return v ? `/verify/upc?upc=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_UPC needs a 12-digit UPC-A or 8-digit UPC-E in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate UPC 036000291452" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_UPC"] },
      },
    ],
  ],
});
