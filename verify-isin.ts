import { extractIsin } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyIsinAction = makePaidAction({
  name: "VERIFY_ISIN",
  similes: ["ISIN_LOOKUP", "CHECK_ISIN", "ISIN_VERIFY"],
  description:
    "Validate an ISIN securities identifier checksum. Provide the isin. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractIsin(text);
    return v ? `/verify/isin?isin=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_ISIN needs an ISIN (e.g. US0378331005) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate ISIN US0378331005" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_ISIN"] },
      },
    ],
  ],
});
