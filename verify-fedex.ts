import { extractFedex } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyFedexAction = makePaidAction({
  name: "VERIFY_FEDEX",
  similes: ["FEDEX_TRACK", "CHECK_FEDEX", "FEDEX_VERIFY"],
  description:
    "Validate a FedEx tracking number structure. Provide the fedex tracking number. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractFedex(text);
    return v ? `/verify/fedex?tracking=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_FEDEX needs a FedEx tracking number in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Track FedEx 123456789012" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_FEDEX"] },
      },
    ],
  ],
});
