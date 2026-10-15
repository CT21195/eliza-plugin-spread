import { extractIpv4 } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyIpv4Action = makePaidAction({
  name: "VERIFY_IPV4",
  similes: ["IPV4_LOOKUP", "CHECK_IPV4", "IP_VERIFY"],
  description:
    "Validate IPv4 format and classify the range. Provide the ipv4 address. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractIpv4(text);
    return v ? `/verify/ipv4?ip=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_IPV4 needs an IPv4 address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate IP 8.8.8.8" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_IPV4"] },
      },
    ],
  ],
});
