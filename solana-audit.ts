import { extractAfter, extractSolanaAddress } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const solanaAuditAction = makePaidAction({
  name: "SOLANA_AUDIT",
  similes: ["AUDIT_TOKEN", "RUGCHECK", "TOKEN_SAFETY", "CHECK_RUG", "TOKEN_AUDIT"],
  description:
    "RugCheck safety audit for a Solana token: risk score, risk level, and specific risk findings. Provide the token mint address. Costs $0.05 USDC per call (x402, Base).",
  buildPath: (text) => {
    const token = extractSolanaAddress(text) ?? extractAfter(text, "token", "mint");
    return token ? `/solana/audit?token=${encodeURIComponent(token)}` : null;
  },
  missingHint: "SOLANA_AUDIT needs a Solana token mint address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Is this token safe? So11111111111111111111111111111111111111112" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run a RugCheck audit on it.", actions: ["SOLANA_AUDIT"] },
      },
    ],
  ],
});
