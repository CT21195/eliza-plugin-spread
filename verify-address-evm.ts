import { extractBaseAddress } from "./extract.js";
import { makePaidAction } from "./_factory.js";

export const verifyEvmAddressAction = makePaidAction({
  name: "VERIFY_EVM_ADDRESS",
  similes: ["EVM_ADDRESS_LOOKUP", "CHECK_EVM_ADDRESS", "ETH_ADDRESS_VERIFY"],
  description:
    "Validate an EVM address and its EIP-55 checksum. Provide the evm address. Costs $0.001 USDC per call (x402, Base).",
  buildPath: (text) => {
    const v = extractBaseAddress(text);
    return v ? `/verify/address/evm?address=${encodeURIComponent(v)}` : null;
  },
  missingHint: "VERIFY_EVM_ADDRESS needs an EVM address (0x…) in the message.",
  examples: [
    [
      { name: "{{user}}", content: { text: "Validate address 0xD7CDd563e8F6A249B076A702b7e2C233CCF3481d" } },
      {
        name: "{{assistant}}",
        content: { text: "I'll run that check.", actions: ["VERIFY_EVM_ADDRESS"] },
      },
    ],
  ],
});
