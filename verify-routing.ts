import { extractRouting } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyRoutingAction = makePaidAction({
  name: "VERIFY_ROUTING",
  similes: ["ROUTING_LOOKUP", "CHECK_ROUTING", "ABA_VERIFY", "VALIDATE_ROUTING"],
  description:
    "Validate a US bank routing number (ABA) checksum. Provide the us bank routing number. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractRouting(text);
    return v ? `/verify/routing?routing=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_ROUTING needs a 9-digit routing number in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate routing number 021000021" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_ROUTING"] },
      },
    ],
  ],
});
