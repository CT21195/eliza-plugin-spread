import { extractSsn } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifySsnAction = makePaidAction({
  name: "VERIFY_SSN",
  similes: ["SSN_LOOKUP", "CHECK_SSN", "SSN_VERIFY"],
  description:
    "Validate a US SSN format against impossible SSA combinations (format only). Provide the us ssn. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractSsn(text);
    return v ? `/verify/ssn?ssn=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_SSN needs an SSN (e.g. 078-05-1120) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate SSN 078-05-1120" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_SSN"] },
      },
    ],
  ],
});
