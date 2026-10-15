import { extractUps } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyUpsAction = makePaidAction({
  name: "VERIFY_UPS",
  similes: ["UPS_TRACK", "CHECK_UPS", "UPS_VERIFY"],
  description:
    "Validate a UPS tracking number (1Z) check digit. Provide the ups tracking number. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractUps(text);
    return v ? `/verify/ups?tracking=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_UPS needs a UPS tracking number (1Z…) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Track UPS 1Z999AA10123456784" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_UPS"] },
      },
    ],
  ],
});
