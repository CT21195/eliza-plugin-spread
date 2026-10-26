import { extractNpi } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const verifyNpiAction = makePaidAction({
  name: "VERIFY_NPI",
  similes: ["NPI_LOOKUP", "CHECK_NPI", "NPI_VERIFY", "VERIFY_PROVIDER", "NPI_SEARCH"],
  description:
    "Verify a healthcare provider's NPI number against the NPPES registry. Provide the 10-digit NPI. Costs $0.01 USDC per call (x402, Base).",
  buildPath: (text) => {
    const npi = extractNpi(text);
    return npi ? `/verify/npi?npi=${encodeURIComponent(npi)}` : null;
  },
  missingHint: "VERIFY_NPI needs a 10-digit NPI number in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Verify NPI 1234567890" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll verify that NPI number.", actions: ["VERIFY_NPI"] },
      },
    ],
  ],
});
