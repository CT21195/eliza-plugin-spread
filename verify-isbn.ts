import { extractIsbn } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyIsbnAction = makePaidAction({
  name: "VERIFY_ISBN",
  similes: ["ISBN_LOOKUP", "CHECK_ISBN", "ISBN_VERIFY"],
  description:
    "Validate ISBN-10/ISBN-13 checksums. Provide the isbn. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractIsbn(text);
    return v ? `/verify/isbn?isbn=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_ISBN needs an ISBN-13 or ISBN-10 in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate ISBN 9780306406157" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_ISBN"] },
      },
    ],
  ],
});
