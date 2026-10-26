import { extractCardNumber } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyCardAction = makePaidAction({
  name: "VERIFY_CARD",
  similes: ["CARD_LOOKUP", "CHECK_CARD", "CARD_VERIFY", "VALIDATE_CARD"],
  description:
    "Validate a card number Luhn checksum and detect the brand (format check only). Provide the credit card number. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractCardNumber(text);
    return v ? `/verify/card?number=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_CARD needs a card number (12-19 digits) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Check card 4111111111111111" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_CARD"] },
      },
    ],
  ],
});
