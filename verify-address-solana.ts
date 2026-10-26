import { extractSolanaAddress } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const verifySolanaAddressAction = makePaidAction({
  name: "VERIFY_SOLANA_ADDRESS",
  similes: ["SOLANA_ADDRESS_LOOKUP", "CHECK_SOLANA_ADDRESS"],
  description:
    "Validate a Solana address (base58, 32 bytes). Provide the solana address. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractSolanaAddress(text);
    return v ? `/verify/address/solana?address=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_SOLANA_ADDRESS needs a Solana address in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate Solana address 11111111111111111111111111111111" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_SOLANA_ADDRESS"] },
      },
    ],
  ],
});
