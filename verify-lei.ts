import { extractLei } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyLeiAction = makePaidAction({
  name: "VERIFY_LEI",
  similes: ["LEI_LOOKUP", "CHECK_LEI", "LEI_VERIFY"],
  description:
    "Validate a Legal Entity Identifier (ISO 17442 mod-97). Provide the lei code. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractLei(text);
    return v ? `/verify/lei?lei=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_LEI needs a 20-character LEI in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate LEI 5493000IBP32UQZ0KL24" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_LEI"] },
      },
    ],
  ],
});
