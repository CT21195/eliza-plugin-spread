import { extractSwift } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifySwiftAction = makePaidAction({
  name: "VERIFY_SWIFT",
  similes: ["SWIFT_LOOKUP", "CHECK_SWIFT", "BIC_VERIFY", "VALIDATE_SWIFT"],
  description:
    "Validate a SWIFT/BIC code structure and parse bank/country/branch. Provide the swift/bic code. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractSwift(text);
    return v ? `/verify/swift?swift=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_SWIFT needs a SWIFT/BIC code (e.g. DEUTDEFF) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate SWIFT code DEUTDEFF500" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_SWIFT"] },
      },
    ],
  ],
});
