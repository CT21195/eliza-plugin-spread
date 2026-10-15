import { extractImei } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyImeiAction = makePaidAction({
  name: "VERIFY_IMEI",
  similes: ["IMEI_LOOKUP", "CHECK_IMEI", "IMEI_VERIFY"],
  description:
    "Validate a device IMEI Luhn checksum. Provide the imei. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractImei(text);
    return v ? `/verify/imei?imei=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_IMEI needs a 15-digit IMEI in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate IMEI 490154203237518" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_IMEI"] },
      },
    ],
  ],
});
