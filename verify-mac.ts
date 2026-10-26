import { extractMac } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyMacAction = makePaidAction({
  name: "VERIFY_MAC",
  similes: ["MAC_LOOKUP", "CHECK_MAC", "MAC_VERIFY"],
  description:
    "Validate a MAC address and parse OUI bits. Provide the mac address. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractMac(text);
    return v ? `/verify/mac?mac=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_MAC needs a MAC address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate MAC 00:1A:2B:3C:4D:5E" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_MAC"] },
      },
    ],
  ],
});
