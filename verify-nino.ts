import { extractNino } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyNinoAction = makePaidAction({
  name: "VERIFY_NINO",
  similes: ["NINO_LOOKUP", "CHECK_NINO", "NINO_VERIFY"],
  description:
    "Validate a UK National Insurance number format. Provide the uk national insurance number. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractNino(text);
    return v ? `/verify/nino?nino=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_NINO needs a UK National Insurance number in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate NINO AB123456C" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_NINO"] },
      },
    ],
  ],
});
