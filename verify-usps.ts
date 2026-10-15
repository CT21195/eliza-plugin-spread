import { extractUsps } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyUspsAction = makePaidAction({
  name: "VERIFY_USPS",
  similes: ["USPS_TRACK", "CHECK_USPS", "USPS_VERIFY"],
  description:
    "Validate a USPS tracking number checksum. Provide the usps tracking number. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractUsps(text);
    return v ? `/verify/usps?tracking=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_USPS needs a USPS tracking number in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Track USPS 94001112025552123456" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_USPS"] },
      },
    ],
  ],
});
