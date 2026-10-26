import { extractAsn } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyAsnAction = makePaidAction({
  name: "VERIFY_ASN",
  similes: ["ASN_LOOKUP", "CHECK_ASN", "ASN_VERIFY"],
  description:
    "Validate an Autonomous System Number and report scope. Provide the as number. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractAsn(text);
    return v ? `/verify/asn?asn=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_ASN needs an AS number (e.g. AS15169) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate ASN AS15169" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_ASN"] },
      },
    ],
  ],
});
