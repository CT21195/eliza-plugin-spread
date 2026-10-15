import { extractEns } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyEnsAction = makePaidAction({
  name: "VERIFY_ENS",
  similes: ["ENS_LOOKUP", "CHECK_ENS", "ENS_VERIFY"],
  description:
    "Validate an ENS name against EIP-137 rules. Provide the ens name. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractEns(text);
    return v ? `/verify/ens?name=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_ENS needs an ENS name (e.g. vitalik.eth) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate ENS vitalik.eth" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_ENS"] },
      },
    ],
  ],
});
