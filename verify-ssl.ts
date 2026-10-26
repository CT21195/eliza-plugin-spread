import { extractDomain } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifySslAction = makePaidAction({
  name: "VERIFY_SSL",
  similes: ["SSL_LOOKUP", "CHECK_SSL", "SSL_VERIFY", "CERT_CHECK"],
  description:
    "Fetch a domain's TLS certificate and report validity and expiry. Provide the domain for ssl check. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractDomain(text);
    return v ? `/verify/ssl?domain=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_SSL needs a domain name in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Check SSL for google.com" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_SSL"] },
      },
    ],
  ],
});
