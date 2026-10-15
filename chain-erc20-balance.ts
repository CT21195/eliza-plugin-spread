import { extractBaseAddresses } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const chainErc20BalanceAction = makePaidAction({
  name: "CHAIN_ERC20_BALANCE_CHECK",
  similes: ["ERC20_BALANCE", "TOKEN_BALANCE", "CHECK_TOKEN_BALANCE", "BASE_TOKEN_BALANCE"],
  description:
    "Get an ERC-20 token balance for a Base wallet. Provide the wallet address and the token contract address (e.g. \"token 0x...\"). Costs $0.003 USDC per call (x402, Base).",
  buildPath: (text) => {
    const all = extractBaseAddresses(text);
    const tokenAfterKeyword = text.match(/token\s+(0x[0-9a-fA-F]{40})/i)?.[1] ?? null;
    let address: string | null = null;
    let token: string | null = null;
    if (tokenAfterKeyword) {
      token = tokenAfterKeyword;
      address = all.find(a => a.toLowerCase() !== tokenAfterKeyword.toLowerCase()) ?? null;
    } else if (all.length >= 2) {
      address = all[0];
      token = all[1];
    }
    if (!address || !token) return null;
    return `/chain/erc20-balance?address=${encodeURIComponent(address)}&token=${encodeURIComponent(token)}`;
  },
  missingHint: "CHAIN_ERC20_BALANCE_CHECK needs a wallet address and a token contract address, e.g. \"token 0x...\".",
  examples: [
    [
      { name: "{{user}}", content: { text: "How much USDC does 0xD7CDd563e8F6A249B076A702b7e2C233CCF3481d hold? Token 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll check that wallet's USDC balance on Base.", actions: ["CHAIN_ERC20_BALANCE_CHECK"] },
      },
    ],
  ],
});
