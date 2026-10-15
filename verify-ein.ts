import { extractEin } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyEinAction = makePaidAction({
  name: "VERIFY_EIN",
  similes: ["EIN_LOOKUP", "CHECK_EIN", "EIN_VERIFY"],
  description:
    "Validate a US EIN format and IRS prefix. Provide the us ein. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractEin(text);
    return v ? `/verify/ein?ein=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_EIN needs an EIN (e.g. 12-3456789) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate EIN 12-3456789" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_EIN"] },
      },
    ],
  ],
});
