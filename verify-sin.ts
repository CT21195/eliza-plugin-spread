import { extractSin } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifySinAction = makePaidAction({
  name: "VERIFY_SIN",
  similes: ["SIN_LOOKUP", "CHECK_SIN", "SIN_VERIFY"],
  description:
    "Validate a Canadian SIN Luhn checksum. Provide the canadian sin. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractSin(text);
    return v ? `/verify/sin?sin=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_SIN needs a 9-digit Canadian SIN in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate SIN 046454286" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_SIN"] },
      },
    ],
  ],
});
