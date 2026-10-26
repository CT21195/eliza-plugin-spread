import { extractSha256 } from "./extract-verify.js";
import { makePaidAction } from "./_factory.js";

export const verifySha256Action = makePaidAction({
  name: "VERIFY_SHA256",
  similes: ["SHA256_LOOKUP", "CHECK_SHA256", "SHA256_VERIFY"],
  description:
    "Validate a 64-character SHA-256 hex digest format. Provide the sha-256 hash. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractSha256(text);
    return v ? `/verify/hash/sha256?hash=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_SHA256 needs a 64-character SHA-256 hash in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate SHA256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_SHA256"] },
      },
    ],
  ],
});
