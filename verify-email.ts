import { extractEmail } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyEmailAction = makePaidAction({
  name: "VERIFY_EMAIL",
  similes: ["EMAIL_LOOKUP", "CHECK_EMAIL", "EMAIL_VERIFY", "MX_LOOKUP"],
  description:
    "Validate email syntax and live MX records. Provide the email address. Costs $0.01 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractEmail(text);
    return v ? `/verify/email?email=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_EMAIL needs an email address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Verify email test@gmail.com" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_EMAIL"] },
      },
    ],
  ],
});
