import { extractMd5 } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifyMd5Action = makePaidAction({
  name: "VERIFY_MD5",
  similes: ["MD5_LOOKUP", "CHECK_MD5", "MD5_VERIFY"],
  description:
    "Validate a 32-character MD5 hex digest format. Provide the md5 hash. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractMd5(text);
    return v ? `/verify/hash/md5?hash=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_MD5 needs a 32-character MD5 hash in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate MD5 d41d8cd98f00b204e9800998ecf8427e" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_MD5"] },
      },
    ],
  ],
});
