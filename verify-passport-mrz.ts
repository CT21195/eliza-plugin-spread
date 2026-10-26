import { extractMrz } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyPassportMrzAction = makePaidAction({
  name: "VERIFY_PASSPORT_MRZ",
  similes: ["MRZ_LOOKUP", "CHECK_MRZ", "PASSPORT_MRZ_VERIFY"],
  description:
    "Validate passport MRZ check digits (ICAO 9303). Provide the passport mrz. Costs $0.005 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractMrz(text);
    return v ? `/verify/passport/mrz?mrz=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_PASSPORT_MRZ needs two 44-character MRZ lines in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate this passport MRZ: P<UTOERIKSSON<<ANNA<MARIA<<<<<<<<<<<<<<<<<<< / L898902C36UTO7408122F1204159ZE184226B<<<<<10" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_PASSPORT_MRZ"] },
      },
    ],
  ],
});
