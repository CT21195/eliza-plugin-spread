import { extractSedol } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifySedolAction = makePaidAction({
  name: "VERIFY_SEDOL",
  similes: ["SEDOL_LOOKUP", "CHECK_SEDOL", "SEDOL_VERIFY"],
  description:
    "Validate a SEDOL (UK securities) checksum. Provide the sedol. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractSedol(text);
    return v ? `/verify/sedol?sedol=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_SEDOL needs a 7-character SEDOL in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate SEDOL 0263494" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_SEDOL"] },
      },
    ],
  ],
});
