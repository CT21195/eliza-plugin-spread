import { extractIpv6 } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyIpv6Action = makePaidAction({
  name: "VERIFY_IPV6",
  similes: ["IPV6_LOOKUP", "CHECK_IPV6"],
  description:
    "Validate IPv6 format and classify the range. Provide the ipv6 address. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractIpv6(text);
    return v ? `/verify/ipv6?ip=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_IPV6 needs an IPv6 address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate IPv6 ::1" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_IPV6"] },
      },
    ],
  ],
});
