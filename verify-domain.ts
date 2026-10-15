import { extractDomain } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyDomainAction = makePaidAction({
  name: "VERIFY_DOMAIN",
  similes: ["DOMAIN_LOOKUP", "CHECK_DOMAIN", "DOMAIN_VERIFY", "RDAP_LOOKUP"],
  description:
    "Look up domain registration status, age, expiry, and registrar via RDAP. Provide the domain name. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractDomain(text);
    return v ? `/verify/domain?domain=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_DOMAIN needs a domain name in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Check domain google.com" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_DOMAIN"] },
      },
    ],
  ],
});
