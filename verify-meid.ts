import { extractMeid } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyMeidAction = makePaidAction({
  name: "VERIFY_MEID",
  similes: ["MEID_LOOKUP", "CHECK_MEID", "MEID_VERIFY"],
  description:
    "Validate a device MEID format and check digit. Provide the meid. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractMeid(text);
    return v ? `/verify/meid?meid=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_MEID needs a 14-15 character MEID in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate MEID A0000000000000" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_MEID"] },
      },
    ],
  ],
});
