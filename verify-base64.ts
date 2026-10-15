import { extractBase64Data } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyBase64Action = makePaidAction({
  name: "VERIFY_BASE64",
  similes: ["BASE64_LOOKUP", "CHECK_BASE64", "BASE64_VERIFY"],
  description:
    "Strictly validate base64/base64url encoding structure. Provide the base64 string. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractBase64Data(text);
    return v ? `/verify/base64?data=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_BASE64 needs a base64 string in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate base64 aGVsbG8=" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_BASE64"] },
      },
    ],
  ],
});
