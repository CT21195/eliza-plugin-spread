import { extractE164 } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyE164Action = makePaidAction({
  name: "VERIFY_E164",
  similes: ["PHONE_LOOKUP", "CHECK_PHONE", "E164_VERIFY"],
  description:
    "Validate E.164 international phone number formatting. Provide the phone number. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractE164(text);
    return v ? `/verify/e164?phone=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_E164 needs a phone number in +E.164 format in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate phone +16315551234" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_E164"] },
      },
    ],
  ],
});
