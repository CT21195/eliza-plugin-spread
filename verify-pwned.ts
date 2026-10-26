import { extractPassword } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyPwnedAction = makePaidAction({
  name: "VERIFY_PWNED",
  similes: ["PWNED_CHECK", "BREACH_CHECK", "PASSWORD_BREACH"],
  description:
    "Check a password against breach data via HIBP k-anonymity (password never sent in full). Provide the password to breach-check. Costs $0.01 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractPassword(text);
    return v ? `/verify/pwned?password=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_PWNED needs a password after the word 'password' in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Check password: password hunter2" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_PWNED"] },
      },
    ],
  ],
});
