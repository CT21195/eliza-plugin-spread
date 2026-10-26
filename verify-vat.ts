import { extractVat } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyVatAction = makePaidAction({
  name: "VERIFY_VAT",
  similes: ["VAT_LOOKUP", "CHECK_VAT", "VAT_VERIFY"],
  description:
    "Validate an EU/GB VAT number format per country rules. Provide the eu vat number. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractVat(text);
    return v ? `/verify/vat?vat=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_VAT needs a VAT number (e.g. DE123456789) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate VAT DE123456789" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_VAT"] },
      },
    ],
  ],
});
