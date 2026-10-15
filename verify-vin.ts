import { extractVin } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyVinAction = makePaidAction({
  name: "VERIFY_VIN",
  similes: ["VIN_LOOKUP", "CHECK_VIN", "VIN_DECODE", "VIN_VERIFY"],
  description:
    "Validate a VIN check digit and decode year/plant. Provide the vin. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractVin(text);
    return v ? `/verify/vin?vin=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_VIN needs a 17-character VIN in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate VIN 1HGCM82633A004352" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_VIN"] },
      },
    ],
  ],
});
