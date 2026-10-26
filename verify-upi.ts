import { extractUpi } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyUpiAction = makePaidAction({
  name: "VERIFY_UPI",
  similes: ["UPI_LOOKUP", "CHECK_UPI", "UPI_VERIFY"],
  description:
    "Validate a UPI ID format (India). Provide the upi id. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractUpi(text);
    return v ? `/verify/upi?upi=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_UPI needs a UPI ID (handle@bank) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate UPI ID test@okhdfcbank" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_UPI"] },
      },
    ],
  ],
});
