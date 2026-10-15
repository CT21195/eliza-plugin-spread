import { extractIban } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyIbanAction = makePaidAction({
  name: "VERIFY_IBAN",
  similes: ["IBAN_LOOKUP", "CHECK_IBAN", "IBAN_VERIFY", "VALIDATE_IBAN"],
  description:
    "Validate an IBAN checksum (ISO 13616 mod-97) and parse country/bank codes. Provide the iban. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractIban(text);
    return v ? `/verify/iban?iban=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_IBAN needs an IBAN (e.g. GB29NWBK60161331926819) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate IBAN GB29NWBK60161331926819" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_IBAN"] },
      },
    ],
  ],
});
